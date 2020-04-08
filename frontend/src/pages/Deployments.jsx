import React, { useContext } from 'react'

import Deployment from '../components/Deployment'
import { DeploymentContextProvider } from '../contexts/DeploymentContext'
import { WebSocketContext } from '../contexts/WebSocketContext'

const Deployments = () => {
  const [deployments] = useContext(WebSocketContext)

  return (
    <div className="container mx-auto min-h-screen" id="Deployments">
      {deployments.map((deployment) => {
        return (
          <DeploymentContextProvider
            key={deployment._id}
            deployment={deployment}
          >
            <Deployment />
          </DeploymentContextProvider>
        )
      })}
    </div>
  )
}

export default Deployments
