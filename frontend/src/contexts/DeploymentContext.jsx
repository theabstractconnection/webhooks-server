/*eslint-disable no-unused-vars*/
import PropTypes from 'prop-types'
import React, { createContext, useState } from 'react'

export const deploymentShape = {
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
