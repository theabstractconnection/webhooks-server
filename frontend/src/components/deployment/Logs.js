import React from 'react'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'

const LogItem = styled.div`
  ${props => (props.type === 'stdout' ? tw`text-white` : tw`text-red-400`)}
  ${tw`text-xs font-mono`}
  & > span {word-break: break-all}
`

const Log = props => {
  const { log } = props

  return (
    <LogItem type={log.type}>
      <span>{log.output}</span>
    </LogItem>
  )
}

const LogsItem = styled.div`
  ${tw`relative h-full max-h-full`}
  & > div {
    ${tw`p-4 bg-black h-full max-h-full overflow-auto`}
  }
  & > .hide_scrollbar {
    ${tw`text-xs absolute p-0 top-0 right-0`}
  }
  & > .hide_scrollbar > .log_title_lg {
    ${tw`
      hidden lg:block bg-white mt-4 text-sm text-black font-medium py-1 px-2 align-middle 
    `}
  }
`

const Logs = props => {
  const { logs } = props

  return (
    <LogsItem className="Log">
      <div className="hide_scrollbar">
        <div className="log_title_lg">Logs</div>
      </div>
      <div>
        {logs.map((log, idx) => (
          <Log log={log} key={idx} />
        ))}
      </div>
    </LogsItem>
  )
}

export default Logs
