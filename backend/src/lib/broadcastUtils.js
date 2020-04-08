import { buildLogMessage } from '~/lib/logUtils'
import { aWss } from '~/server'

export const getClients = () => aWss.clients
export const broadcast = (message) => {
  getClients().forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(message)
    }
  })
}

export const broadcastLog = (_id, type, data) => {
  broadcast(JSON.stringify(buildLogMessage(_id, type, data)))
}

export const broadcastStatus = (_id, status) => {
  broadcast(
    JSON.stringify({
      event: 'status',
      _id,
      status,
    })
  )
}
