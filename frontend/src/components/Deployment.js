import PropTypes from 'prop-types'
import React, { createContext, useContext, useState } from 'react'

import AdditionalInfos from './deployment/AdditionalInfos'
import {
  Card,
  CardContent,
  CardContentFooter,
  CardContentHeader,
  CardPicture,
} from './deployment/Card'
import LogWindow from './deployment/LogWindow'
import Repository from './deployment/Repository'

const deploymentShape = {
  _id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  logs: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  webhookDeliveryId: PropTypes.string.isRequired,
}

// Create Context Object
export const DeploymentContext = createContext()

// Create a provider for components to consume and subscribe to changes
export const DeploymentContextProvider = (props) => {
  const { children, deployment } = props
  const [expanded, setExpanded] = useState(
    deployment.status === 'Pending' ? true : false
  )

  return (
    <DeploymentContext.Provider value={[deployment, expanded, setExpanded]}>
      {children ? children : ''}
    </DeploymentContext.Provider>
  )
}

DeploymentContextProvider.propTypes = {
  deployment: PropTypes.shape(deploymentShape).isRequired,
}

export const Deployment = () => {
  const [deployment, expanded, setExpanded] = useContext(DeploymentContext)
  const handleExpand = () => setExpanded(!expanded)
  const {
    data: { repository },
  } = deployment

  return (
    <Card className="Deployment" expanded={expanded}>
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
  deployment: PropTypes.shape(deploymentShape).isRequired,
}
