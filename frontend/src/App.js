/*eslint-disable no-unused-vars*/
import React, { useState, useEffect, useMemo } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import useWebSocket, { ReadyState } from 'react-use-websocket'
import axios from 'axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faAngleDown,
  faAngleUp,
  faAt,
  faHeart,
  faCopyright,
} from '@fortawesome/free-solid-svg-icons'

import './App.css'
import NavBar from './components/NavBar'
import Header from './components/Header'
import About from './components/About'
import Footer from './components/Footer'
import { Deployment, DeploymentContextProvider } from './components/Deployment'

library.add(fab, faAngleDown, faAngleUp, faAt, faHeart, faCopyright)

const PROXY_PORT = 9000

const App = () => {
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
      console.log(lastMessageData.deployment)

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
    <div className="App w-full">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/deployments">
            <div id="Deployments" className="container mx-auto min-h-screen">
              {deployments.map((deployment) => {
                return (
                  <DeploymentContextProvider
                    deployment={deployment}
                    key={deployment._id}
                  >
                    <Deployment />
                  </DeploymentContextProvider>
                )
              })}
            </div>
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Header />
          </Route>
        </Switch>
        <Footer />
      </Router>

      {/* <div>
        <span>The WebSocket is currently {connectionStatus}</span>
      </div> */}
    </div>
  )
}

export default App
