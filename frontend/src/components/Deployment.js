import React, { useState, createContext, useContext } from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  CardPicture,
  CardContent,
  CardContentHeader,
  CardContentFooter,
} from './deployment/Card'

import Summary from './deployment/Summary'
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
    <DeploymentContext.Provider
      value={[deployment, expanded, setExpanded]}
    >
      {props.children}
    </DeploymentContext.Provider>
  )
}

export const Deployment = () => {
  const [deployment, expanded, setExpanded] = useContext(DeploymentContext)
  const handleExpand = () => setExpanded(!expanded)
  const {
    data: { repository },
  } = deployment

  return (
    <Card className="Deployment" onClick={handleExpand}>
      {console.log(deployment)}
      <CardPicture src={repository.owner.avatar_url} />
      <CardContent>
        <CardContentHeader>
          <Summary />
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
