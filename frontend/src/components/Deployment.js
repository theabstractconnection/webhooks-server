import React, { useState } from 'react'
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
import Logs from './deployment/Logs'
import AdditionalInfos from './deployment/AdditionalInfos'

const Deployment = props => {
  const [expanded, setExpanded] = useState(false)
  const handleExpand = () => setExpanded(!expanded)
  const {
    webhookDeliveryId,
    data: { repository, sender, pusher, commits },
    logs,
    status,
  } = props.deployment

  return (
    <Card className="Deployment" onClick={handleExpand}>
      <CardPicture src={repository.owner.avatar_url} />
      <CardContent>
        <CardContentHeader status={status}>
          <Summary
            expanded={expanded}
            expandHandler={handleExpand}
            status={status}
          />
          <Repository
            expanded={expanded}
            repository={repository}
          />
          <AdditionalInfos
            commits={commits}
            expanded={expanded}
            user={{ ...sender, email: pusher.email }}
            webhookDeliveryId={webhookDeliveryId}
          />
        </CardContentHeader>
        <CardContentFooter>
          {expanded && <Logs logs={logs} expanded={expanded} />}
        </CardContentFooter>
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

export default Deployment
