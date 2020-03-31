import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'

const ExpandItem = styled.div`
  ${tw`px-2 flex items-center justify-center`}
`

const Expand = props => {
  const { expanded, expandHandler } = props

  return (
    <ExpandItem onClick={expandHandler}>
      <FontAwesomeIcon
          icon={!expanded ? 'angle-down' : 'angle-up'}
      />
    </ExpandItem>
  )
}

export default Expand


