import React, { useContext } from 'react'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { DeploymentContext } from '../Deployment'

const UserItem = styled.div`
  ${props =>
    !props.expanded ? tw`justify-end` : tw`justify-end lg:justify-start`}

  ${tw`flex items-center`}
`
const AvatarItem = styled.img`
  ${tw`w-10 h-10 rounded-full mr-4`}
`
const UserInfo = styled.div`
  ${tw`text-sm`}
  & > .login {
    ${tw`text-gray-900 leading-none`}
  }
  & > .email {
    ${tw`text-gray-600 text-xs`}
  }
`

const User = props => {
  const [deployment, expanded] = useContext(DeploymentContext)
  const {
    data: {
      sender,
      repository: { pusher },
    },
  } = deployment
  return (
    <UserItem expanded={expanded}>
      <AvatarItem src={sender.avatar_url} alt="User" />
      <UserInfo>
        <p className="login">{sender.login}</p>
        {pusher && <p className="email">{pusher.email}</p>}
      </UserInfo>
    </UserItem>
  )
}

export default User
