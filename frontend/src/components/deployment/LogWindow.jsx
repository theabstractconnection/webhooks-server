import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { useContext, useEffect, useRef } from 'react'
import tw from 'tailwind.macro'

import { DeploymentContext } from '~/contexts/DeploymentContext'

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
  ${(props) => (props.type === 'stdout' ? tw`text-white` : tw`text-red-400`)}
  ${tw`text-xs font-mono`}
`

const LogContent = styled.span`
  word-break: break-all;
`

const Log = (props) => {
  const { log } = props

  return (
    <LogItem type={log.type}>
      <LogContent>{log.output}</LogContent>
    </LogItem>
  )
}

Log.propTypes = {
  log: PropTypes.shape({
    output: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
}

const LogWindow = () => {
  const { deployment } = useContext(DeploymentContext)
  const { logs } = deployment
  const logWindowRef = useRef(null)

  useEffect(() => {
    if (logWindowRef.current && logWindowRef.current.lastChild) {
      let lastLog = logWindowRef.current.lastChild
      logWindowRef.current.scrollTop = lastLog.offsetHeight + lastLog.offsetTop
    }
  }, [logs])

  return (
    <LogWindowItem className="LogWindow">
      <LogWindowTitle>Logs</LogWindowTitle>
      <LogWindowContent ref={logWindowRef} className="LogWindowContent">
        {logs.map((log, idx) => (
          /*eslint-disable-next-line*/
          <Log log={log} key={idx} />
        ))}
      </LogWindowContent>
    </LogWindowItem>
  )
}

export default LogWindow
