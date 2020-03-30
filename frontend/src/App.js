import React, { useState, useEffect, useRef } from 'react'

import Deployment from './components/Deployment'

import './App.css'

function App() {
  const socket = useRef(null)

  const [messages, setMessages] = useState([])
  const [deployments, setDeployments] = useState([
    // {
    //   deploy: {
    //     data:{},
    //     log:[],
    //     status: ""
    //   }
    // }
  ])

  const buildSocketUrl = () => {
    const socketProtocol =
      window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const hostname = window.location.hostname
    const port = window.location.port
    const socketUrl = `${socketProtocol}//${hostname}${
      port ? ':' + port : ''
    }/socket`
    return socketUrl
  }

  // const onDeployMsg = msg => {
  //   console.log(msg.githubInfos)
  //   setDeployments(oldDeploys => [
  //     ...oldDeploys,
  //     {
  //       deploy: {
  //         data: msg.githubInfos,
  //         log: [],
  //         status: 'pending',
  //       },
  //     },
  //   ])
  //   console.log(deployments)
  // }

  // const onLogMsg = msg => {
  //   setDeployments(oldDeploys =>
  //     oldDeploys.map(deploy =>
  //       deploy.data.webhookDeliveryId === msg.webhookDeliveryId
  //         ? { ...deploy, log: deploy.log.concat([msg.data]) }
  //         : deploy
  //     )
  //   )
  // }

  useEffect(() => {
    const initWS = () => {
      if (socket.current) {
        return
      }

      let ws = new WebSocket(buildSocketUrl())

      socket.current = ws

      ws.onopen = () => {
        console.log('Socket is open :)')
        ws.send(`NEW client conexion`)
      }

      ws.onclose = e => {
        console.log('Socket is closed', e.reason)
        socket.current = null
      }

      ws.onerror = err => {
        console.error(
          'Socket encountered error: ',
          err.message,
          'Closing socket'
        )
        ws.close()
      }

      ws.onmessage = e => {
        let msg = JSON.parse(e.data)
        console.log(msg)
        setMessages([...messages, msg])
      }
    }
    initWS()
  }, [])

  useEffect(() => {
    setDeployments(
      messages
        .filter(m => m.event === 'deploy')
        .map(m => {
          return {
            deploy: {
              data: m.githubInfos,
              log: [],
              status: '',
            },
          }
        })
    )
  }, [messages])

  return (
    <div className="App">
      <div id="Deployments">
        {deployments.map((deploy, index) => {
          return <Deployment key={index} deploy={deploy} />
        })}
      </div>
    </div>
  )
}

export default App
