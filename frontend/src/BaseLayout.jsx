import React from 'react'

import Footer from './components/Footer'
import NavBar from './components/NavBar'

const BaseLayout = (props) => {
  const { children } = props
  return (
    <React.Fragment>
      <NavBar />
      {children}
      <Footer />
    </React.Fragment>
  )
}

export default BaseLayout
