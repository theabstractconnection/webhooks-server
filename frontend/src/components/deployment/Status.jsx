import styled from '@emotion/styled'
import React, { useContext } from 'react'
import tw from 'tailwind.macro'

import { DeploymentContext } from '~/contexts/DeploymentContext'

const StatusItem = styled.span`
  ${(props) =>
    props.status === 'Pending'
      ? tw`bg-blue-500` //text-blue-500 bg-blue-100
      : props.status === 'Success'
      ? tw`bg-green-500` //text-green-500 bg-green-100
      : tw`bg-red-500`} //text-red-500 bg-red-100
  ${tw`
      text-sm text-white font-medium py-1 px-2 rounded align-middle 
  `}
`

const Status = () => {
  const { deployment } = useContext(DeploymentContext)
  const { status } = deployment
  return (
    <StatusItem status={status}>
      <i aria-hidden="true" className="fas fa-star"></i>
      {status}
    </StatusItem>
  )
}

export default Status
