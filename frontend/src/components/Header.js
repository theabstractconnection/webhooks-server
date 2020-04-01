import React from 'react'
import { Link } from 'react-router-dom'
import networkPicture from '../assets/images/network.jpg'

const Main = () => {
  return (
    <div class="relative w-full flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2 bg-cover">
      <div class="z-10">
        <h2 class="text-3xl font-semibold text-gray-800 md:text-4xl">
          Homemade{' '}
          <span class="text-indigo-600">Webhooks deployment server</span>
        </h2>
        <p class="mt-2 text-sm text-whitemd:text-base">
          Built with React Express Mongo Docker and more...
        </p>
        <div class="flex justify-center lg:justify-start mt-6">
          <Link
            class="px-4 py-3 bg-gray-900 text-gray-200 text-xs font-semibold rounded hover:bg-gray-800"
            to="/deployments"
          >
            View recent deployments
          </Link>
          <Link
            class="mx-4 px-4 py-3 bg-gray-300 text-gray-900 text-xs font-semibold rounded hover:bg-gray-400"
            to="/about"
          >
            Learn More
          </Link>
        </div>
      </div>
      {/* <div
        class="absolute lg:hidden top-0 left-0 w-full h-full opacity-75"
        style={{
          'background-image': `url(${networkPicture})`,
        }}
      ></div> */}
    </div>
  )
}

const ClipSplash = () => {
  return (
    <div
      class="hidden lg:block lg:w-1/2"
      style={{ 'clip-path': 'polygon(10% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      <div
        class="h-full object-cover bg-cover opacity-75"
        style={{
          'background-image': `url(${networkPicture})`,
        }}
      >
      </div>
    </div>
  )
}

const Header = () => {
  return (
    <div class="flex" style={{ height: '600px' }}>
      <Main />
      <ClipSplash />
    </div>
  )
}

export default Header
