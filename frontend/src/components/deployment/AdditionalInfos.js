import React from 'react'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Commits from './Commits'
import User from './User'

const AdditionalInfosItem = styled.div`
  ${props => (!props.expanded 
    ? tw`flex-row items-center justify-between` 
    : tw`flex-col`)}

  
  ${tw`
      flex text-sm font-medium align-middle 
  `}
`

const AdditionalInfos = props => {
  const { commits, expanded, user, webhookDeliveryId } = props

  return (
    <AdditionalInfosItem expanded={expanded}>
      <div>Deployment Id: {webhookDeliveryId}</div>
      {expanded && <Commits commits={commits} expanded={expanded} />}
      <User user={user} expanded={expanded} />
    </AdditionalInfosItem>
  )
}

export default AdditionalInfos
