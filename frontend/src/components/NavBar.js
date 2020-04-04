import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import WebHooks from '../assets/images/webhooks.png'
import clsx from 'clsx'

const NavLink = (props) => {
  const { name, to, clickHandler } = props
  return (
    <Link
      to={to}
      onClick={clickHandler}
      className="text-center text-gray-600 rounded hover:border-b-2 hover:text-gray-800 border-gray-800 hover:font-medium py-2 px-2 md:mx-2"
    >
      {name}
    </Link>
  )
}

NavLink.propTypes = {
  name: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  clickHandler: PropTypes.func,
}

const NavLinks = (props) => {
  const { isOpened, setOpened } = props
  const clickHandler = () => setOpened(false)

  return (
    <div
      className={clsx(
        'flex flex-col md:flex-row mx-2',
        isOpened ? 'md:hidden' : 'hidden md:block'
      )}
    >
      <NavLink to="/deployments" name="Deployments" onClick={clickHandler} />
      <NavLink to="/about" name="About" onClick={clickHandler} />
    </div>
  )
}

NavLinks.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  setOpened: PropTypes.func.isRequired,
}

const NavBar = () => {
  const [isOpened, setOpened] = useState(false)

  return (
    <nav className="bg-white shadow-lg">
      <div className="md:flex items-center justify-between py-2 px-8 md:px-12">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800 md:text-3xl">
            <Link to="/" className="flex flex-row items-center justify-center">
              <img
                src={WebHooks}
                alt="Webhooks Logo"
                className="h-12 mr-3"
              ></img>
              <span className="hidden md:block">Deployment Server</span>
            </Link>
          </div>
          <div className="md:hidden" onClick={() => setOpened(!isOpened)}>
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
        <NavLinks isOpened={isOpened} setOpened={setOpened} />
      </div>
    </nav>
  )
}

export default NavBar
