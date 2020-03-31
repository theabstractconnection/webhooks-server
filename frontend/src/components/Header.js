import React from 'react'
import { Link } from 'react-router-dom'

const Main = () => {
  return (
    <div class="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
      <div>
        <h2 class="text-3xl font-semibold text-gray-800 md:text-4xl">
          Homemade{' '}
          <span class="text-indigo-600">Webhooks deployment server</span>
        </h2>
        <p class="mt-2 text-sm text-gray-500 md:text-base">
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
        class="h-full object-cover"
        style={{
          'background-image':
            'url(https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80)',
        }}
      >
        <div class="h-full bg-black opacity-25"></div>
      </div>
    </div>
  )
}

const Header = () => {
  return (
    <div class="flex bg-white" style={{ height: '600px' }}>
      <Main />
      <ClipSplash />
    </div>
  )
}

export default Header
