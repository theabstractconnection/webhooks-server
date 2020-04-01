import bodyParser from 'body-parser'
import express from 'express'
import expressWs from 'express-ws'

import { connectDatabase } from './db'
import { verifyPostData } from './middlewares'
import { deploy } from './utils'

import deploymentRoutes from './domain/deployment/deployment.routes'

const PORT = process.env.PORT || 9000

const expressWsExpress = expressWs(express())
var app = expressWsExpress.app
const aWss = expressWsExpress.getWss()

let deploymentRouter = express.Router()

// MIDLEWARES
app.use(bodyParser.json())
app.use(express.static(`${__dirname}/../../frontend/build`))
app.use((err, req, res, next) => {
  if (err) console.error(err)
  res.status(403).send('Request body was not signed or verification failed')
})

// WEBSOCKET
app.ws('/socket', function(ws, req) {
  console.log('Total connected clients:', aWss.clients.size)
})

// DEPLOYMENTS ROUTES
app.use('/api/ressources/deployment', deploymentRouter)
deploymentRoutes(deploymentRouter)

// WEBHOOK ROUTE
app.post('/api/deploy', verifyPostData, (req, res) => {
  const sender = req.body.sender.login
  const organization = req.body.repository.owner.login
  const repositoryName = req.body.repository.name
  const repositorySshUrl = req.body.repository.ssh_url

  if (
    sender === process.env.GITHUB_USERNAME &&
    organization === process.env.GITHUB_ORGANIZATION
  ) {
    deploy(req, res, repositoryName, repositorySshUrl, aWss)
  }
})

// CONNECT TO DATABASE & START EXPRESS SERVER
connectDatabase(() =>
  app.listen(PORT, () => {
    console.log(`Webhook server started on port ${PORT}`)
    // console.log(app._router.stack)
    // console.log(deploymentRouter.stack)
  })
)
