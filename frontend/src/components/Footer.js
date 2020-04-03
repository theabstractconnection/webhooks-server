import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="py-2 px-8 md:px-12">
        <div className="flex flex-row flex-wrap items-center justify-between ext-md text-gray-800">
        <div className="text-center w-full md:w-auto">
            <FontAwesomeIcon icon="copyright" className="mr-1" />
            <span>The Abstract Connection 2020</span>
          </div>
          <div className="font-bold text-center w-full md:w-auto">
            <span>Made with</span>
            <FontAwesomeIcon icon="heart" className="text-red-600 mx-1" />
            <FontAwesomeIcon icon="at" />
            <span>TheAbstractConnection</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Footer
