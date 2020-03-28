const bodyParser = require('body-parser')
const express = require('express')
const expressWs = require('express-ws')
const expressWsExpress = expressWs(express())
const childProcess = require('child_process')
const crypto = require('crypto')
const queryString = require('query-string')

var app = expressWsExpress.app
const aWss = expressWsExpress.getWss()

const sigHeaderName = 'X-Hub-Signature'
const deliveryHeaderName = 'X-GitHub-Delivery'

const API_SECRET = process.env.API_SECRET || ''
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || ''
const GITHUB_ORGANIZATION = process.env.GITHUB_ORGANIZATION || ''
const SERVER_USERNAME = process.env.SERVER_USERNAME || ''

const PORT = process.env.PORT || 9000

app.use(bodyParser.json())
app.use(express.static(`${__dirname}/frontend/build`))
app.use((err, req, res, next) => {
  if (err) console.error(err)
  res.status(403).send('Request body was not signed or verification failed')
})

app.ws('/socket', function(ws, req) {
  console.log('Total connected clients:', aWss.clients.size)
})

app.post('/', verifyPostData, (req, res) => {
  const sender = req.body.sender.login
  const organization = req.body.repository.owner.login
  const repositoryName = req.body.repository.name
  const repositorySshUrl = req.body.repository.ssh_url

  if (sender === GITHUB_USERNAME && organization === GITHUB_ORGANIZATION) {
    broadcast(
      aWss.clients,
      JSON.stringify({
        event: 'deploy',
        githubInfos:  req.body,
        webhookDeliveryId: req.headers[deliveryHeaderName]
      })
    )
    deploy(req, res, repositoryName, repositorySshUrl)
    res.sendStatus(200)
  }
})

function broadcast(clients, message) {
  clients.forEach(client => {
    if (client.readyState === client.OPEN) {
      client.send(message)
    }
  })
}

function verifyPostData(req, res, next) {
  const payload = JSON.stringify(req.body)
  if (!payload) {
    return next('Request body empty')
  }

  const sig = req.get(sigHeaderName) || ''
  const hmac = crypto.createHmac('sha1', API_SECRET)
  const digest = Buffer.from(
    'sha1=' + hmac.update(payload).digest('hex'),
    'utf8'
  )
  const checksum = Buffer.from(sig, 'utf8')
  if (
    checksum.length !== digest.length ||
    !crypto.timingSafeEqual(digest, checksum)
  ) {
    return next(
      `Request body digest (${digest}) did not match ${sigHeaderName} (${checksum})`
    )
  }
  return next()
}

function deploy(req, res, repositoryName, repositorySshUrl) {
  const parsed = queryString.parse(req.originalUrl)
  const target = '/?target' in parsed ? parsed['/?target'] : ''
  const deploymentProcess = childProcess.spawn(
    '/bin/bash',
    [
      '-c',
      `
        export PROJECT_NAME="${repositoryName}";
        export GIT_URL="${repositorySshUrl}";
        export TARGET="${target}";
        export SERVER_USERNAME="${SERVER_USERNAME}";
        ./webhooks-server/deploy.sh 
      `,
    ],
    { cwd: '/home/ec2-user/projects' }
  )

  deploymentProcess.stdout.setEncoding('utf8')
  deploymentProcess.stdout.on('data', function(data) {
    console.log('stdout: ' + data)
    broadcast(
      aWss.clients,
      JSON.stringify({
        event: 'log',
        data: {
          type: 'stdout',
          output: data,
        },
        webhookDeliveryId: req.headers[deliveryHeaderName]
      })
    )
  })

  deploymentProcess.stderr.setEncoding('utf8')
  deploymentProcess.stderr.on('data', function(data) {
    broadcast(
      aWss.clients,
      JSON.stringify({
        event: 'log',
        data: {
          type: 'stderr',
          output: data,
        },
        webhookDeliveryId: req.headers[deliveryHeaderName]
      })
    )
  })
  res.sendStatus(200)
}

app.listen(PORT, () => console.log(`Webhook server started on port ${PORT}`))
