import React, { useState, useEffect, useRef } from 'react'

import Deploy from './components/Deploy'

import './App.css'

function App() {
  const socket = useRef(null)

  const [messages, setMessages] = useState([])
  const [deploys, setDeploys] = useState([
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
  //   setDeploys(oldDeploys => [
  //     ...oldDeploys,
  //     {
  //       deploy: {
  //         data: msg.githubInfos,
  //         log: [],
  //         status: 'pending',
  //       },
  //     },
  //   ])
  //   console.log(deploys)
  // }

  // const onLogMsg = msg => {
  //   setDeploys(oldDeploys =>
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
    setDeploys(
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
      <div id="Deploys">
        {deploys.map((deploy, index) => {
          return <Deploy key={index} deploy={deploy} />
        })}
      </div>
    </div>
  )
}

export default App
