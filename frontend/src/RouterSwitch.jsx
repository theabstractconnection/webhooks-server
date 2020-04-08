import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import About from '~/pages/About'
import Deployments from '~/pages/Deployments'
import Home from '~/pages/Home'

import BaseLayout from './BaseLayout'

const RouterSwitch = () => {
  return (
    <Router>
      <BaseLayout>
        <Switch>
          <Route path="/deployments">
            <Deployments />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BaseLayout>
    </Router>
  )
}
export default RouterSwitch
