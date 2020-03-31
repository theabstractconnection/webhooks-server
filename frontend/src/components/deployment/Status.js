import React from 'react'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'

// const StatusItem = styled.span`
//   ${props =>
//     props.status === 'Pending'
//       ? tw`bg-blue-500`
//       : props.status === 'Success'
//       ? tw`bg-green-500`
//       : tw`bg-red-500`}
//   ${tw`
//     tracking-wider text-white px-4 py-1 
//     text-sm rounded leading-loose mx-2 font-semibold
//   `}
// `

const StatusItem = styled.span`
  ${props =>
    props.status === 'Pending'
      ? tw`bg-blue-500` //text-blue-500 bg-blue-100
      : props.status === 'Success'
      ? tw`bg-green-500` //text-green-500 bg-green-100
      : tw`bg-red-500` //text-red-500 bg-red-100
    }
  ${tw`
      text-sm text-white font-medium py-1 px-2 rounded align-middle 
  `}
`

const Status = props => {
  const { status } = props

  return (
    <StatusItem status={status}>
      <i className="fas fa-star" aria-hidden="true"></i>
      {status}
    </StatusItem>
  )
}

export default Status
