import React from 'react'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'

const UserItem = styled.div`
  ${props => (!props.expanded ? tw`justify-end` : tw`justify-end lg:justify-start`)}

  ${tw`flex items-center`}
`
const AvatarItem = styled.img`
  ${tw`w-10 h-10 rounded-full mr-4`}
`
const UserInfo = styled.div`
  ${tw`text-sm`}
  & > p {
    ${tw`text-gray-600 text-xs`}
  }
  & > p:first-of-type {
    ${tw`text-gray-900 leading-none`}
  }
`

const User = props => {
  const { user, expanded } = props

  return (
    <UserItem expanded={expanded}>
      <AvatarItem src={user.avatar_url} alt="User" />
      <UserInfo>
        <p>{user.login}</p>
        <p>{user.email}</p>
      </UserInfo>
    </UserItem>
  )
}

export default User
