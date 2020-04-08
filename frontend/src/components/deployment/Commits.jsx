import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import tw from 'tailwind.macro'

import { DeploymentContext } from '~/contexts/DeploymentContext'

const CommitsItem = styled.div`
  flex-grow: 1;
  ${tw`flex`}
`

const CommitItem = styled.div`
  ${tw`mb-3`}
`

const Commit = (props) => {
  const { commit } = props

  return (
    <CommitItem>
      <a href={commit.url} rel="noopener noreferrer" target="_blank">
        {commit.id.substring(0, 8)}: {commit.message}
      </a>
    </CommitItem>
  )
}

Commit.propTypes = {
  commit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
}

const Commits = () => {
  const [deployment] = useContext(DeploymentContext)
  const {
    data: { commits },
  } = deployment

  return (
    <CommitsItem>
      {commits &&
        /*eslint-disable-next-line*/
        commits.map((commit, idx) => <Commit commit={commit} key={idx} />)}
    </CommitsItem>
  )
}

export default Commits
