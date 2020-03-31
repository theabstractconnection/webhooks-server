import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styled from '@emotion/styled'
import tw from 'tailwind.macro'

const RepositoryItem = styled.div`
  ${props => (!props.expanded 
    ? tw`` 
    : tw`mb-4`)}

  & > div {
    ${tw`flex flex-row items-baseline mb-1 leading-none`}
  }
  & > div > a:first-of-type {
    ${tw`text-gray-900 font-bold text-3xl`}
  }
  & > div > a {
    ${tw`text-2xl text-gray-600`}
  }
  & > p {
    ${tw`text-sm text-gray-600`}
  }
`

const Repository = props => {
  const { repository, expanded  } = props

  return (
    <RepositoryItem repository={repository} expanded={expanded}>
      <div>
        <a href={repository.html_url} target="_blank" rel="noopener noreferrer">
          {repository.name}
        </a>
        <FontAwesomeIcon icon={['fab', 'github']} />
        <a href={repository.html_url} target="_blank" rel="noopener noreferrer">
          {repository.owner.name}
        </a>
      </div>
      <p>{repository.description}</p>
    </RepositoryItem>
  )
}

export default Repository
