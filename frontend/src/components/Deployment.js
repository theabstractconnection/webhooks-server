import React /*, { useState, useEffect, useRef }*/ from 'react'
import PropTypes from 'prop-types'

import styled from '@emotion/styled'
import tw from 'tailwind.macro'

const Card = styled.div`
  ${tw`
      bg-gray-200 text-xl max-w-sm w-full lg:max-w-full lg:flex
  `}
`
const CardPicture = styled.img`
  ${tw`
    h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t 
    lg:rounded-t-none lg:rounded-l text-center overflow-hidden
  `}
`

const Deployment = props => {
  const {
    webhookDeliveryId,
    data: { repository, sender, commits },
    logs,
    status,
  } = props.deployment

  return (
    <Card id="Deployment">
      <CardPicture src={repository.owner.avatar_url} />
      <div class="text-gray-900 font-bold text-xl mb-2">{repository.name}</div>
      <p class="text-sm text-gray-600 flex items-center">
        {repository.owner.name}
      </p>
      <p class="text-sm text-gray-600 flex items-center">
        {repository.description}
      </p>
      <div class="flex items-center">
        <img src={sender.avatar_url}  class="w-10 h-10 rounded-full mr-4" alt="Avatar" />
        <div class="text-sm">
          <p class="text-gray-900 leading-none">{sender.login}</p>
          <p class="text-gray-600">{sender.email}</p>
        </div>
      </div>

      <div className="repository">
        <div>{repository.html_url}</div>
      </div>
      <div>{webhookDeliveryId}</div>
      <div>{status}</div>
      <div className="commits">
        {commits.map(comit => (
          <div>
            <div>{comit.id}</div>
            <a href={comit.url} target="_blank" rel="noopener noreferer">
              {comit.message}
            </a>
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
