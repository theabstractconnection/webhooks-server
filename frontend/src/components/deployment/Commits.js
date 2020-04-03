import React, { useContext } from 'react'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { DeploymentContext } from '../Deployment'

const CommitsItem = styled.div`
  flex-grow: 1;
  ${tw`flex`}
`

const CommitItem = styled.div`
  ${tw`mb-3`}
`

const Commit = props => {
  const { commit } = props

  return (
    <CommitItem>
      <a href={commit.url} target="_blank" rel="noopener noreferrer">
        {commit.id.substring(0, 8)}: {commit.message}
      </a>
    </CommitItem>
  )
}

const Commits = () => {
  const [deployment] = useContext(DeploymentContext)
  const {
    data: { commits },
  } = deployment

  return (
    <CommitsItem>
      {commits &&
        commits.map((commit, idx) => <Commit commit={commit} key={idx} />)}
    </CommitsItem>
  )
}

export default Commits
