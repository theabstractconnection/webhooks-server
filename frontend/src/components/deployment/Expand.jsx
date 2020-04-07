import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import tw from 'tailwind.macro'

import { DeploymentContext } from '../Deployment'

const ExpandItem = styled.div`
  ${tw`px-2 flex items-center justify-center`}
`

const Expand = () => {
  const [expanded, handleExpand] = useContext(DeploymentContext)

  return (
    <ExpandItem onClick={handleExpand}>
      <FontAwesomeIcon icon={!expanded ? 'angle-down' : 'angle-up'} />
    </ExpandItem>
  )
}

export default Expand
