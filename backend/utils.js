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
    const options = {
      cwd: `${__dirname}/../../../`,
      // shell: true,
      stdio: [
        'inherit', // StdIn.
        'pipe', // StdOut.
        'pipe', // StdErr.
      ],
    }

    const deploymentProcess = childProcess.spawn(
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
      options
    )

    handleStdout(deploymentProcess, fullLog, deployment, aWss.clients)
    handleStderr(deploymentProcess, fullLog, deployment, aWss.clients)
  })

  res.sendStatus(200)
}

export const broadcast = (clients, message) => {
  clients.forEach(client => {
    if (client.readyState === client.OPEN) {
      client.send(message)
    }
  })
}

const formatLogData = data => {
  return data.split('\n').filter(d => d)
}

const pushToFullLog = (fullLog, type, data) => {
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

const handleStdout = (deploymentProcess, fullLog, deployment, clients) => {
  deploymentProcess.stdout.setEncoding('utf8')
  deploymentProcess.stdout.on('data', data => {
    formatLogData(data).forEach(d => {
      pushToFullLog(fullLog, 'stdout', d)
      broadcastLog(clients, deployment._id, 'stdout', d)
      if (d.includes('☠☠☠ SUCCCESS SERVICES STARTED')) {
        updateDeployment(deployment, fullLog, 'Succes')
        broadcastStatus(clients, deployment._id, 'Success')
      }
    })
  })
}

const handleStderr = (deploymentProcess, fullLog, deployment, clients) => {
  deploymentProcess.stderr.setEncoding('utf8')
  deploymentProcess.stderr.on('data', data => {
    formatLogData(data).forEach(d => {
      pushToFullLog(fullLog, 'stderr', d)
      broadcastLog(clients, deployment._id, 'stderr', d)
    })
    updateDeployment(deployment, fullLog, 'Failure')
    broadcastStatus(clients, deployment._id, 'Failure')
  })
}
