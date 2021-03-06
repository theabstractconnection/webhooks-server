import styled from '@emotion/styled'
import React from 'react'
import tw from 'tailwind.macro'

import Status from '~/components/deployment/Status'
// import Expand from '~/components/deployment/Expand'

const SummaryItem = styled.div`
  ${tw``}
`

const Summary = () => {
  return (
    <SummaryItem>
      <Status />
      {/* <Expand/> */}
    </SummaryItem>
  )
}

export default Summary
