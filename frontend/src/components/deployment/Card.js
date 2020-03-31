import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const Card = styled.div`
  ${tw`
      text-xlmax-w-sm w-full lg:max-w-full lg:flex
      my-6 shadow-md
  `}
`
export const CardPicture = styled.div`
  ${props => `background-image: url('${props.src}');`}
  ${tw`
      h-48 lg:h-auto lg:w-48 flex-none bg-cover bg-center rounded-t 
      lg:rounded-t-none lg:rounded-l text-center overflow-hidden
  `}
`
export const CardContent = styled.div`
  ${tw`
      bg-white rounded-b lg:rounded-b-none lg:rounded-r 
      flex flex-col lg:flex-row justify-between leading-normal
      w-full
  `}
`

// export const CardContentHeader = styled.div`
//   ${props =>
//     props.status === 'Pending'
//       ? tw`bg-blue-100`
//       : props.status === 'Success'
//       ? tw`bg-green-100`
//       : tw`bg-red-100`}

//   ${tw`
//       p-4 flex flex-col justify-between leading-normal
//       w-full relative
//   `}
// `

export const CardContentHeader = styled.div`
  ${tw`
      p-4 flex flex-col justify-between leading-normal
      w-full relative
  `}
`

export const CardContentFooter = styled.div`
  ${tw`
  
  `}
`
