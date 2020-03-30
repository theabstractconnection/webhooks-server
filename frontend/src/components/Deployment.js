import React /*, { useState, useEffect, useRef }*/ from 'react'
import PropTypes from 'prop-types'

const Deployment = props => {
  const {
    webhookDeliveryId,
    data: { repository, sender, commits },
    logs,
    status,
  } = props.deployment

  return (
    <div id="Deployment">
      <div>{webhookDeliveryId}</div>
      <div>{status}</div>
      <div className="repository">
        <div>{repository.name}</div>
        <div>{repository.owner.name}</div>
        <img style={{width: "30px", height: "30px"}} src={repository.owner.avatar_url} />
        <div>{repository.html_url}</div>
        <div>{repository.description}</div>
      </div>
      <div className="sender">
        <div>{sender.login}</div>
        <img style={{width: "30px", height: "30px"}} src={sender.avatar_url} />
      </div>
      <div className="commits">
        {commits.map(comit => (
          <div>
            <div>{comit.id}</div>
            <div>{comit.url}</div>
          </div>
        ))}
      </div>
      <div className="logs">
        {logs.map(log => (
          <div>
            <div>{log.type}</div>
            <div>{log.output}</div>
          </div>
        ))}
      </div>
    </div>
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
