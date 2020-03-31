import React from 'react'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Status from './Status'
// import Expand from './Expand'

const SummaryItem = styled.div`
  ${tw`absolute m-4 top-0 right-0 flex z-50`}
  & > * {${tw`ml-2`}}
`

const Summary = () => {
  return (
    <SummaryItem>
      <Status/>
      {/* <Expand/> */}
    </SummaryItem>
  )
}

export default Summary
