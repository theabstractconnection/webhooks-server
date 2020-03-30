import childProcess from 'child_process'
import queryString from 'query-string'


export const deploy = (req, res, repositoryName, repositorySshUrl) => {
  const parsed = queryString.parse(req.originalUrl)
  const target = '/?target' in parsed ? parsed['/?target'] : ''

  let fullLog = ''

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
    { cwd: '/home/ec2-user/projects' }
  )

  deploymentProcess.stdout.setEncoding('utf8')
  deploymentProcess.stdout.on('data', function(data) {
    fullLog += 'stdout: ' + data
    broadcast(
      aWss.clients,
      JSON.stringify({
        event: 'log',
        data: {
          type: 'stdout',
          output: data,
        },
        webhookDeliveryId: req.get(deliveryHeaderName),
      })
    )
  })

  deploymentProcess.stderr.setEncoding('utf8')
  deploymentProcess.stderr.on('data', function(data) {
    fullLog += 'stderr: ' + data
    broadcast(
      aWss.clients,
      JSON.stringify({
        event: 'log',
        data: {
          type: 'stderr',
          output: data,
        },
        webhookDeliveryId: req.get(deliveryHeaderName),
      })
    )
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