import React, { useContext } from 'react'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { DeploymentContext } from '../Deployment'
import Commits from './Commits'
import User from './User'

const AdditionalInfosItem = styled.div`
  ${props =>
    !props.expanded ? tw`flex-row items-center justify-between` : tw`flex-col`}
  ${tw`flex flex-grow text-sm font-medium align-middle`}
`

const DeploymentId = styled.div`
 ${tw`mb-2`};
`

const AdditionalInfos = () => {
  const [deployment, expanded] = useContext(DeploymentContext)
  const { webhookDeliveryId } = deployment

  return (
    <AdditionalInfosItem expanded={expanded}>
      <DeploymentId>Deployment Id: {webhookDeliveryId}</DeploymentId>
      {expanded && <Commits />}
      <User />
    </AdditionalInfosItem>
  )
}

export default AdditionalInfos
