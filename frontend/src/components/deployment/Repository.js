import React, { useContext } from 'react'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { DeploymentContext } from '../Deployment'
import Summary from './Summary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const RepositoryItem = styled.div`
  ${props => (!props.expanded ? tw`` : tw`mb-4`)}
  & > p,
  i {
    ${tw`text-sm text-gray-600`}
  }
`
const RepositoryMainInfos = styled.div`
  ${tw`flex flex-row items-baseline mb-1 leading-none flex-wrap`}
`
const RepositoryMainInfosWrapper = styled.div`
  ${tw`flex`}
`
const RepositoryName = styled.a`
  ${tw`text-gray-900 font-bold text-3xl`}
`

const RepositoryOwner = styled.a`
${tw`text-2xl text-gray-900`}
`

const Repository = props => {
  const [deployment, expanded] = useContext(DeploymentContext)
  const {
    data: { repository },
  } = deployment

  return (
    <RepositoryItem expanded={expanded}>
      <RepositoryMainInfosWrapper className="flex justify-between flex-wrap">
        <RepositoryMainInfos>
          <RepositoryName
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {repository.name}
          </RepositoryName>
          <FontAwesomeIcon
            icon={['fab', 'github']}
            style={{ marginRight: '0.5rem', marginLeft: '0.5rem' }}
          />
          <RepositoryOwner
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {repository.owner.login}
          </RepositoryOwner>
        </RepositoryMainInfos>
        <Summary />
      </RepositoryMainInfosWrapper>
      <p>{repository.description}</p>
      <i>{deployment.data.zen}</i>
    </RepositoryItem>
  )
}

export default Repository
