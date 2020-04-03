import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import WebHooks from '../assets/images/webhooks.png'

const NavLinks = props => {
  const { opened, setOpened } = props
  return (
    <React.Fragment>
      <div className="flex flex-col md:flex-row mx-2 hidden md:block">
        <Link
          to="/deployments"
          onClick={() => {
            setOpened(false)
          }}
          className="text-center text-gray-600 rounded hover:border-b-2 hover:text-gray-800 border-gray-800 hover:font-medium py-2 px-2 md:mx-2"
        >
          Deployments
        </Link>
        <Link
          to="/about"
          onClick={() => {
            setOpened(false)
          }}
          className="text-center text-gray-600 rounded hover:border-b-2 hover:text-gray-800 border-gray-800 hover:font-medium py-2 px-2 md:mx-2"
        >
          About
        </Link>
      </div>
      {opened && (
        <div className="flex flex-col md:flex-row mx-2 md:hidden">
          <Link
            to="/deployments"
            onClick={() => {
              setOpened(false)
            }}
            className="text-center text-gray-600 rounded hover:border-b-2 hover:text-gray-800 border-gray-800 hover:font-medium py-2 px-2 md:mx-2"
          >
            Deployments
          </Link>
          <Link
            to="/about"
            onClick={() => {
              setOpened(false)
            }}
            className="text-center text-gray-600 rounded hover:border-b-2 hover:text-gray-800 border-gray-800 hover:font-medium py-2 px-2 md:mx-2"
          >
            About
          </Link>
        </div>
      )}
    </React.Fragment>
  )
}
const NavBar = () => {
  const [opened, setOpened] = useState(false)

  return (
    <nav className="bg-white shadow-lg">
      <div className="md:flex items-center justify-between py-2 px-8 md:px-12">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800 md:text-3xl">
            <Link to="/" className="flex flex-row items-center justify-center">
              <img src={WebHooks} className="h-12 mr-3"></img>
              <span className="hidden md:block">Deployment Server</span>
            </Link>
          </div>
          <div className="md:hidden" onClick={() => setOpened(!opened)}>
            <button
              type="button"
              className="block text-gray-800 hover:text-gray-700 focus:text-gray-700 focus:outline-none"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path
                  className="hidden"
                  d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"
                />
                <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              </svg>
            </button>
          </div>
        </div>
        <NavLinks opened={opened} setOpened={setOpened} />
      </div>
    </nav>
  )
}

export default NavBar
