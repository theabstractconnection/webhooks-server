import Footer from './components/Footer'
import NavBar from './components/NavBar'
import React from 'react'

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
