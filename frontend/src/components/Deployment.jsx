import PropTypes from 'prop-types'
import React, { useContext } from 'react'

import AdditionalInfos from '../components/deployment/AdditionalInfos'
import {
  Card,
  CardContent,
  CardContentFooter,
  CardContentHeader,
  CardPicture,
} from '../components/deployment/Card'
import LogWindow from '../components/deployment/LogWindow'
import Repository from '../components/deployment/Repository'
import {
  DeploymentContext,
  deploymentShape,
} from '../contexts/DeploymentContext'

const Deployment = () => {
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

export default Deployment
