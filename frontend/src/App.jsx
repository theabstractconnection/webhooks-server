import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faAngleDown,
  faAngleUp,
  faAt,
  faCopyright,
  faHeart,
} from '@fortawesome/free-solid-svg-icons'
import React from 'react'

import { WebSocketContextProvider } from '~/contexts/WebSocketContext'

import RouterSwitch from './RouterSwitch'

library.add(fab, faAngleDown, faAngleUp, faAt, faHeart, faCopyright)

const App = () => {
  return (
    <div className="App w-full">
      <WebSocketContextProvider>
        <RouterSwitch />
      </WebSocketContextProvider>
    </div>
  )
}

export default App
