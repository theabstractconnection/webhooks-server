import React from 'react'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'

const CommitItem = styled.div`
  ${tw`
      mb-3
  `}
`

const Commit = props => {
  const { commit } = props

  return (
    <CommitItem>
      <a href={commit.url} target="_blank" rel="noopener noreferrer">
      {commit.id.substring(0,8)}: {commit.message}
      </a>
    </CommitItem>
  )
}

const CommitsItem = styled.div`
  ${tw`
   
  `}
`

const Commits = props => {
  const { commits } = props

  return (
    <CommitsItem>
      {commits.map((commit, idx) => (
        <Commit commit={commit} key={idx} />
      ))}
    </CommitsItem>
  )
}

export default Commits
