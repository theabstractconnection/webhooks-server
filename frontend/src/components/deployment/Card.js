import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const Card = styled.div`
  ${tw`text-xlmax-w-sm w-full lg:max-w-full lg:flex my-6 
       shadow-md opacity-75 hover:opacity-100 active:opacity-100`}
  ${(props) => (props.expanded ? 'opacity:1;' : '')}
`

export const CardPicture = styled.div`
  ${tw`flex h-48 lg:h-auto lg:w-48 flex-none bg-cover bg-center rounded-t 
       lg:rounded-t-none lg:rounded-l text-center overflow-hidden`}
  ${(props) => `background-image: url('${props.imageSrc}') `}
`

export const CardContent = styled.div`
  ${tw`w-full bg-white rounded-b lg:rounded-b-none lg:rounded-r 
       flex flex-col lg:flex-row justify-between leading-normal`}
`

export const CardContentHeader = styled.div`
  ${tw`p-4 flex flex-col leading-normal w-full relative`}
`

export const CardContentFooter = styled.div`
  ${tw``}
`
