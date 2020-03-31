import React, { useContext } from 'react'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { DeploymentContext } from '../Deployment'

const LogItem = styled.div`
  ${props => (props.type === 'stdout' ? tw`text-white` : tw`text-red-400`)}
  ${tw`text-xs font-mono`}
  & > span {
    word-break: break-all;
  }
`

const Log = props => {
  const { log } = props

  return (
    <LogItem type={log.type}>
      <span>{log.output}</span>
    </LogItem>
  )
}

const LogWindowItem = styled.div`
  ${tw`relative h-full max-h-full`}
  & > .log_window_content {
    ${tw`p-4 bg-black h-full max-h-full overflow-auto`}
    &::-webkit-scrollbar {
      display: none;
    }
  }
  & > .log_window_title {
    ${tw`text-xs absolute p-0 top-0 right-0 bg-transparent`}
    ${tw`
      hidden lg:block bg-white mt-4 text-sm text-black font-medium py-1 px-2 align-middle 
    `}
  }
`

const LogWindow = () => {
  const [deployment] = useContext(DeploymentContext)
  const { logs } = deployment

  return (
    <LogWindowItem className="LogWindow">
      <div className="log_window_title">Logs</div>
      <div className="log_window_content">
        {logs.map((log, idx) => (
          <Log log={log} key={idx} />
        ))}
      </div>
    </LogWindowItem>
  )
}

export default LogWindow
