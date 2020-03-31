import React, { useContext } from 'react'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { DeploymentContext } from '../Deployment'

const RepositoryItem = styled.div`
  ${props => (!props.expanded ? tw`` : tw`mb-4`)}

  & > div {
    ${tw`flex flex-row items-baseline mb-1 leading-none`}
  }
  & > div > a:first-of-type {
    ${tw`text-gray-900 font-bold text-3xl`}
  }
  & > div > a {
    ${tw`text-2xl text-gray-900`}
  }
  & > p,i {
    ${tw`text-sm text-gray-600`}
  }
`

const Repository = props => {
  const [deployment, expanded] = useContext(DeploymentContext)
  const {
    data: { repository },
  } = deployment

  return (
    <RepositoryItem expanded={expanded}>
      <div>
        <a href={repository.html_url} target="_blank" rel="noopener noreferrer">
          {repository.name}
        </a>
        <FontAwesomeIcon icon={['fab', 'github']} style={{marginRight: "0.5rem", marginLeft: "0.5rem"}}/>
        <a href={repository.html_url} target="_blank" rel="noopener noreferrer">
          {repository.owner.login}
        </a>
      </div>
      <p>{repository.description}</p>
      <i>{deployment.data.zen}</i>
    </RepositoryItem>
  )
}

export default Repository
