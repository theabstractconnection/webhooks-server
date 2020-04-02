import childProcess from 'child_process'
import queryString from 'query-string'
import Deployment from './domain/deployment/deployment.model'
import { aWss } from './server'

const deliveryHeaderName = 'X-GitHub-Delivery'

export const deploy = (req, res) => {
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

    broadcast(JSON.stringify({ event: 'deploy', deployment: deployment._doc }))

    let fullLog = []
    const deploymentProcess = spawnChild(
      req.body.repository.name,
      req.body.repository.ssh_url,
      target
    )

    handleProcessOutput('stdout', deploymentProcess, fullLog, deployment)
    handleProcessOutput('stderr', deploymentProcess, fullLog, deployment)
  })

  res.sendStatus(200)
}

const processOptions = {
  cwd: process.env.IS_DEV ? `${__dirname}/../../` : `${__dirname}/../../../`,
  // shell: true,
  stdio: [
    'inherit', // StdIn.
    'pipe', // StdOut.
    'pipe', // StdErr.
  ],
}

const spawnChild = (repositoryName, repositorySshUrl, target) => {
  return childProcess.spawn(
    '/bin/bash',
    [
      '-c',
      `
      export PROJECT_NAME="${repositoryName}";
      export GIT_URL="${repositorySshUrl}";
      export TARGET="${target}";
      export SERVER_USERNAME="${process.env.SERVER_USERNAME}";
      "./webhooks-server/deploy.sh"
    `,
    ],
    processOptions
  )
}

const getClients = () => aWss.clients
const broadcast = message => {
  getClients().forEach(client => {
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

const broadcastLog = (_id, type, data) => {
  broadcast(JSON.stringify(buildLogMessage(_id, type, data)))
}

const broadcastStatus = (_id, status) => {
  broadcast(
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

const handleProcessOutput = (type, deploymentProcess, fullLog, deployment) => {
  deploymentProcess[type].setEncoding('utf8')
  deploymentProcess[type].on('data', data => {
    formatLogData(data).forEach(d => {
      console.log(d)
      appendToProcessLog(fullLog, type, d)
      broadcastLog(deployment._id, type, d)
      if (type === 'stdout' && d.includes('☠☠☠ SUCCCESS SERVICES STARTED')) {
        updateDeployment(deployment, fullLog, 'Success')
        broadcastStatus(deployment._id, 'Success')
      }
    })
    if (type === 'stderr') {
      updateDeployment(deployment, fullLog, 'Failure')
      broadcastStatus(deployment._id, 'Failure')
    }
  })
}
