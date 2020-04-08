import styled from '@emotion/styled'
import React, { useContext } from 'react'
import tw from 'tailwind.macro'

import Commits from '../../components/deployment/Commits'
import User from '../../components/deployment/User'
import { DeploymentContext } from '../../contexts/DeploymentContext'

const AdditionalInfosItem = styled.div`
  flex-grow: 1;
  ${tw`flex text-sm font-medium align-middle`}
  ${(props) =>
    !props.expanded
      ? tw`flex-row items-center justify-between`
      : tw`flex-col flex-grow`}
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
