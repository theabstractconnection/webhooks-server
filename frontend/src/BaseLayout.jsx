import React from 'react'

import Footer from '~/components/Footer.jsx'
import NavBar from '~/components/NavBar.jsx'

const BaseLayout = (props) => {
  const { children } = props
  return (
    <React.Fragment>
      <NavBar />
      {children && children}
      <Footer />
    </React.Fragment>
  )
}

export default BaseLayout
