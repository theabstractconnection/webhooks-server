import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import tw from 'tailwind.macro'

import Status from './Status'
// import Expand from './Expand'

const SummaryItem = styled.div`
  ${tw``}
`

const TrashItem = styled.div`
  ${tw`px-2 flex items-center justify-center`}
`

const Summary = () => {
  return (
    <SummaryItem>
      <Status />
      <TrashItem>
        <FontAwesomeIcon icon={'trash'} />
      </TrashItem>
      {/* <Expand/> */}
    </SummaryItem>
  )
}

export default Summary
