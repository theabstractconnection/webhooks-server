import React, { useState, createContext, useContext, useRef } from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  CardPicture,
  CardContent,
  CardContentHeader,
  CardContentFooter,
} from './deployment/Card'

import Repository from './deployment/Repository'
import LogWindow from './deployment/LogWindow'
import AdditionalInfos from './deployment/AdditionalInfos'

// Create Context Object
export const DeploymentContext = createContext()

// Create a provider for components to consume and subscribe to changes
export const DeploymentContextProvider = props => {
  const { deployment } = props
  const [expanded, setExpanded] = useState(false)

  return (
    <DeploymentContext.Provider value={[deployment, expanded, setExpanded]}>
      {props.children}
    </DeploymentContext.Provider>
  )
}

export const Deployment = props => {
  const [deployment, expanded, setExpanded] = useContext(DeploymentContext)
  const deploymentRef = useRef(null);
  const handleExpand = () => {deploymentRef.current.setActive; setExpanded(!expanded)}
  const {
    data: { repository },
  } = deployment

  return (
    <Card className="Deployment" ref={deploymentRef}>
      <CardPicture
        imageSrc={repository.owner.avatar_url}
        onClick={handleExpand}
      />
      <CardContent>
        <CardContentHeader onClick={handleExpand}>
          <Repository />
          <AdditionalInfos />
        </CardContentHeader>
        <CardContentFooter>{expanded && <LogWindow />}</CardContentFooter>
      </CardContent>
    </Card>
  )
}

Deployment.propTypes = {
  deployment: PropTypes.shape({
    logs: PropTypes.array.isRequired,
    _id: PropTypes.string.isRequired,
    webhookDeliveryId: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
  }),
}
