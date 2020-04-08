import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import tw from 'tailwind.macro'

import Summary from '../../components/deployment/Summary'
import { DeploymentContext } from '../../contexts/DeploymentContext'

const RepositoryItem = styled.div`
  ${(props) => (!props.expanded ? tw`` : tw`mb-4`)}
  & > p,
  i {
    ${tw`text-sm text-gray-600`}
  }
`
const RepositoryMainInfos = styled.div`
  ${tw`flex flex-row items-baseline mb-1 leading-none flex-wrap`}
`
const RepositoryMainInfosWrapper = styled.div`
  ${tw`flex justify-between`}
`
const RepositoryName = styled.a`
  ${tw`text-gray-900 font-bold text-3xl`}
`

const RepositoryOwner = styled.a`
  ${tw`text-2xl text-gray-900`}
`

const Repository = () => {
  const [deployment, expanded] = useContext(DeploymentContext)
  const {
    data: { repository, zen },
  } = deployment

  return (
    <RepositoryItem expanded={expanded}>
      <RepositoryMainInfosWrapper>
        <RepositoryMainInfos>
          <RepositoryName
            href={repository.html_url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {repository.name}
          </RepositoryName>
          <FontAwesomeIcon
            icon={['fab', 'github']}
            style={{ marginRight: '0.5rem', marginLeft: '0.5rem' }}
          />
          <RepositoryOwner
            href={repository.html_url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {repository.owner.login}
          </RepositoryOwner>
        </RepositoryMainInfos>
        <Summary />
      </RepositoryMainInfosWrapper>
      <p>{repository.description}</p>
      <i>{zen}</i>
    </RepositoryItem>
  )
}

export default Repository
