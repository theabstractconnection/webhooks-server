import childProcess from 'child_process'
import queryString from 'query-string'
import Deployment from './domain/deployment/deployment.model'

const deliveryHeaderName = 'X-GitHub-Delivery'

export const deploy = (req, res, repositoryName, repositorySshUrl, aWss) => {
  const parsed = queryString.parse(req.originalUrl)
  const target = '/?target' in parsed ? parsed['/?target'] : ''
  const webhookDeliveryId = req.get(deliveryHeaderName)

  const deployment = {
    webhookDeliveryId,
    data: req.body,
    logs: [],
    status: 'Pending',
  }

  Deployment.create(deployment, (err, deployment) => {
    if (err) {
      res.sendStatus(500)
    }

    broadcast(
      aWss.clients,
      JSON.stringify({ event: 'deploy', deployment: deployment._doc })
    )

    let fullLog = []

    const deploymentProcess = spawnChild(
      repositoryName,
      repositorySshUrl,
      target
    )

    handleProcessOutput(deploymentProcess, fullLog, deployment, aWss.clients)
  })

  res.sendStatus(200)
}

const processOptions = {
  cwd: `${__dirname}/../../../`,
  // shell: true,
  stdio: [
    'inherit', // StdIn.
    'pipe', // StdOut.
    'pipe', // StdErr.
  ],
}

const spawnChild = (repositoryName, repositorySshUrl, target) => {
  childProcess.spawn(
    '/bin/bash',
    [
      '-c',
      `
      export PROJECT_NAME="${repositoryName}";
      export GIT_URL="${repositorySshUrl}";
      export TARGET="${target}";
      export SERVER_USERNAME="${process.env.SERVER_USERNAME}";
      ./webhooks-server/deploy.sh 
    `,
    ],
    processOptions
  )
}

const broadcast = (clients, message) => {
  clients.forEach(client => {
    if (client.readyState === client.OPEN) {
      client.send(message)
    }
  })
}

const formatLogData = data => {
  return data.split('\n').filter(d => d)
}

const appendToProcessLog = (fullLog, type, data) => {
  fullLog.push({
    type: type,
    output: data,
  })
}

const buildLogMessage = (_id, type, data) => {
  return {
    event: 'log',
    _id,
    log: {
      type: type,
      output: data,
    },
  }
}

const broadcastLog = (clients, _id, type, data) => {
  broadcast(clients, JSON.stringify(buildLogMessage(_id, type, data)))
}

const broadcastStatus = (clients, _id, status) => {
  broadcast(
    clients,
    JSON.stringify({
      event: 'status',
      _id,
      status,
    })
  )
}

const updateDeployment = (deployment, logs, status) => {
  Deployment.update({ _id: deployment._id }, { logs, status }, () => {})
}

const handleProcessOutput = (
  deploymentProcess,
  fullLog,
  deployment,
  clients
) => {
  ;['stdout', 'stderr'].forEach(type => {
    deploymentProcess[type].setEncoding('utf8')
    deploymentProcess[type].on('data', data => {
      formatLogData(data).forEach(d => {
        appendToProcessLog(fullLog, type, d)
        broadcastLog(clients, deployment._id, type, d)
        if (type === 'stdout' && d.includes('☠☠☠ SUCCCESS SERVICES STARTED')) {
          updateDeployment(deployment, fullLog, 'Success')
          broadcastStatus(clients, deployment._id, 'Success')
        }
      })
      if (type === 'stderr') {
        updateDeployment(deployment, fullLog, 'Failure')
        broadcastStatus(clients, deployment._id, 'Failure')
      }
    })
  })
}
