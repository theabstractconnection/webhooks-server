/*eslint-disable no-unused-vars*/
import axios from 'axios'
import React, { createContext, useEffect, useMemo, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

const PROXY_PORT = 9000

// Create Context Object
export const WebSocketContext = createContext()

// Create a provider for components to consume and subscribe to changes
export const WebSocketContextProvider = (props) => {
  const { children } = props
  const buildSocketUrl = () => {
    const socketProtocol =
      window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const hostname = window.location.hostname
    const port = window.location.port
    const socketUrl = `${socketProtocol}//${hostname}${
      port ? ':' + PROXY_PORT : ''
    }/socket`
    return socketUrl
  }

  // console.log(buildSocketUrl())

  const options = useMemo(
    () => ({
      shouldReconnect: () => true,
      reconnectAttempts: 10,
      reconnectInterval: 3000,
    }),
    []
  )

  const [deployments, setDeployments] = useState([])
  const [socketUrl, setSocketUrl] = useState(buildSocketUrl())
  const [sendMessage, lastMessage, readyState, getWebSocket] = useWebSocket(
    socketUrl,
    options
  )

  useEffect(() => {
    const fetchDeployments = async () => {
      const { data } = await axios.get('/api/ressources/deployment')
      setDeployments(data.deployments)
      // console.log(data.deployments)
    }
    fetchDeployments()
  }, [])

  useEffect(() => {
    if (lastMessage !== null) {
      const lastMessageData = JSON.parse(lastMessage.data)
      // const currentWebsocketUrl = getWebSocket().url
      // console.log('received a message from ', currentWebsocketUrl)

      if (lastMessageData.event === 'deploy') {
        setDeployments((prev) => [lastMessageData.deployment].concat(prev))
      }
      if (lastMessageData.event === 'log') {
        setDeployments((prev) =>
          prev.map((dep) => {
            return dep._id === lastMessageData._id
              ? { ...dep, logs: dep.logs.concat([lastMessageData.log]) }
              : dep
          })
        )
      }
      if (lastMessageData.event === 'status') {
        setDeployments((prev) =>
          prev.map((dep) => {
            return dep._id === lastMessageData._id
              ? { ...dep, status: lastMessageData.status }
              : dep
          })
        )
      }
    }
  }, [lastMessage])

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
  }[readyState]

  return (
    <WebSocketContext.Provider value={[deployments, connectionStatus]}>
      {children ? children : ''}
    </WebSocketContext.Provider>
  )
}
