import React, { useContext } from 'react'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { DeploymentContext } from '../Deployment'

const UserItem = styled.div`
  ${props =>
    !props.expanded ? tw`justify-end` : tw`justify-end lg:justify-start`}
  ${tw`flex items-center flex-grow items-end`}
`
const AvatarItem = styled.img`
  ${tw`w-10 rounded-full md:mr-4`}
`
const UserInfo = styled.div`
  ${tw`hidden text-sm`}
`

const Login = styled.div`
  ${tw`text-gray-900 leading-none`}
`

const Email = styled.div`
  ${tw`text-gray-600 text-xs`}
`

const User = () => {
  const [deployment, expanded] = useContext(DeploymentContext)
  const {
    data: { sender, pusher },
  } = deployment
  return (
    <UserItem expanded={expanded}>
      {console.log(pusher)}
      <AvatarItem src={sender.avatar_url} alt="User" />
      {/* {pusher && ( */}
        <UserInfo>
          <Login>{pusher.name}</Login>
          <Email>{pusher.email}</Email>
        </UserInfo>
      {/* )} */}
    </UserItem>
  )
}

export default User
