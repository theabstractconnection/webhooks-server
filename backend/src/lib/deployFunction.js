import queryString from 'query-string'

import Deployment from '~/domain/deployment/deployment.model'
import { broadcast } from '~/lib/broadcastUtils'
import { spawnChild } from '~/lib/spawnChild'

const deliveryHeaderName = 'X-GitHub-Delivery'

export const deployFunction = (req, res) => {
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
      target,
      deployment._doc,
      fullLog
    )
    const outputTypes = [('stdout', 'stderr')]
    outputTypes.forEach((type) => deploymentProcess.handleProcessOutput(type))
  })

  res.sendStatus(200)
}
