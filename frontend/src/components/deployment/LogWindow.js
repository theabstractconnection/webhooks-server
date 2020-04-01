import React, { useContext } from 'react'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { DeploymentContext } from '../Deployment'

const LogWindowItem = styled.div`
  ${tw`relative h-full`}
  &::-webkit-scrollbar {
    display: none;
  }
`

const LogWindowTitle = styled.div`
  ${tw`text-xs absolute p-0 top-0 right-0 bg-transparent hidden lg:block 
       bg-white mt-4 text-sm text-black font-medium py-1 px-2 align-middle`};
`

const LogWindowContent = styled.div`
  ${tw`p-4 bg-black h-full h-full overflow-auto`};
  &::-webkit-scrollbar {
    display: none;
  }
`

const LogItem = styled.div`
  ${props => (props.type === 'stdout' ? tw`text-white` : tw`text-red-400`)}
  ${tw`text-xs font-mono`}
`

const LogContent = styled.span`
  word-break: break-all
`

const Log = props => {
  const { log } = props

  return (
    <LogItem type={log.type}>
      <LogContent>{log.output}</LogContent>
    </LogItem>
  )
}

const LogWindow = () => {
  const [deployment] = useContext(DeploymentContext)
  const { logs } = deployment

  return (
    <LogWindowItem className="LogWindow">
      <LogWindowTitle>Logs</LogWindowTitle>
      <LogWindowContent>
        {logs.map((log, idx) => (
          <Log log={log} key={idx} />
        ))}
      </LogWindowContent>
    </LogWindowItem>
  )
}

export default LogWindow
