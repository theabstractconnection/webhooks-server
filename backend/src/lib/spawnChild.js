import childProcess from 'child_process'

import Deployment from '~/domain/deployment/deployment.model'
import { broadcastLog, broadcastStatus } from '~/lib/broadcastUtils'
import { appendToProcessLog, formatLogData } from '~/lib/logUtils'

const processOptions = {
  cwd: process.env.IS_DEV
    ? `${__dirname}/../../../`
    : `${__dirname}/../../../../`,
  // shell: true,
  stdio: [
    'inherit', // StdIn.
    'pipe', // StdOut.
    'pipe', // StdErr.
  ],
}

const updateDeployment = (deployment, logs, status) => {
  Deployment.update({ _id: deployment._id }, { logs, status }, () => {})
}

const catchWronglyConsideredAsStderr = (d, type) => {
  const mappings = ['is up-to-date', 'Building']
  let rightType
  mappings.forEach((m) => {
    rightType = d.includes(m) ? 'stdout' : type
  })
  return rightType
}

const handleProcessOutput = function (type) {
  this.child[type].setEncoding('utf8')
  this.child[type].on('data', (data) => {
    console.log(data)
    formatLogData(data).forEach((d) => {
      type = catchWronglyConsideredAsStderr(d, type)
      appendToProcessLog(this.fullLog, type, d)
      broadcastLog(this.deployment._id, type, d)
      if (type === 'stdout' && d.includes('☠☠☠ SUCCCESS SERVICES STARTED')) {
        updateDeployment(this.deployment, this.fullLog, 'Success')
        broadcastStatus(this.deployment._id, 'Success')
      }
    })
    if (type === 'stderr') {
      updateDeployment(this.deployment, this.fullLog, 'Failure')
      broadcastStatus(this.deployment._id, 'Failure')
    }
  })
}

export const spawnChild = (
  repositoryName,
  repositorySshUrl,
  target,
  deployment,
  fullLog
) => {
  return {
    child: childProcess.spawn(
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
    ),
    deployment,
    fullLog,
    handleProcessOutput,
  }
}
