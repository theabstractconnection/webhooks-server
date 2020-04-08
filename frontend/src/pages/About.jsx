import React from 'react'

import AWSLogo from '~/assets/images/aws.png'
import BashLogo from '~/assets/images/bash.png'
import DockerLogo from '~/assets/images/docker.png'
import ExpressLogo from '~/assets/images/express.png'
import JSLogo from '~/assets/images/js.png'
import MakeLogo from '~/assets/images/make.png'
import MongoDbLogo from '~/assets/images/mongodb.svg'
import NginxLogo from '~/assets/images/nginx.png'
import NodeLogo from '~/assets/images/node.svg'
import ReactLogo from '~/assets/images/react.png'
import TailwindLogo from '~/assets/images/tailwind.png'
import WebSocketLogo from '~/assets/images/websocket.png'

const About = () => {
  return (
    <div className="w-full flex items-center text-center lg:text-left px-8 md:px-12">
      <div className="z-10 m-auto">
        <h2 className="text-center text-3xl font-semibold text-gray-800 md:text-4xl mt-10 mb-20">
          <div>Homemade </div>
          <div className="text-indigo-600">Webhooks deployment server</div>
        </h2>
        <div className="mt-2 mb-20 text-sm text-whitemd:text-base max-w-3xl">
          <div className="mt-3 mb-6">
            <div className="text-2xl font-semibold text-gray-800">Hosting</div>
            <p className="text-gray-700">
              Hosted on automated aws ec2 instances (setup of instances is fully
              automated by{' '}
              <a
                className="text-blue-400 underline hover:font-semibold"
                href="https://github.com/theabstractconnection/configs/blob/master/ec2-setup.sh"
                rel="noopener noreferrer"
              >
                this script
              </a>
              )
            </p>
            <div className="mt-3 flex flex-row flex-wrap items-center justify-center">
              <img alt="Logo" className="m-3 h-20" src={AWSLogo} />
            </div>
          </div>
          <div className="mt-3 mb-6">
            <div className="text-2xl font-semibold text-gray-800">
              Infrastructure
            </div>
            <p className="text-gray-700">
              Custom Bash script that trigger Make commands (see{' '}
              <a
                className="text-blue-400 underline hover:font-semibold"
                href="https://github.com/theabstractconnection/docker-compose-makefile"
                rel="noopener noreferrer"
              >
                this repository
              </a>{' '}
              for details) to pull/build and start (as services) dockerized
              projects with docker-compose. Projects are mapped to subdomains
              with Nginx reverse proxy
            </p>
            <div className="mt-3 flex flex-row flex-wrap items-center justify-center">
              <img alt="Bash Logo" className="m-3 h-20" src={BashLogo} />
              <img alt="Make Logo" className="m-3 h-20" src={MakeLogo} />
              <img alt="Docker Logo" className="m-3 h-20" src={DockerLogo} />
              <img alt="Nginx Logo" className="m-3 h-20" src={NginxLogo} />
            </div>
          </div>
          <div className="mt-3 mb-6">
            <div className="text-2xl font-semibold text-gray-800">
              Backend Server
            </div>
            <p className="text-gray-700">
              NodeJs backend server built with ExpressJs and MongoDB (it also
              spawn a websocket server to broadcast deploments and deployments
              logs)
            </p>
            <div className="mt-3 flex flex-row flex-wrap items-center justify-center">
              <img alt="Node Logo" className="m-3 h-20" src={NodeLogo} />
              <img alt="Express Logo" className="m-3 h-20" src={ExpressLogo} />
              <img alt="MongoDB Logo" className="m-3 h-20" src={MongoDbLogo} />
            </div>
          </div>
          <div className="mt-3 mb-6">
            <div className="text-2xl font-semibold text-gray-800">
              Frontend Application
            </div>
            <p className="text-gray-700">
              Create React App that use Websocket (to provide live logging
              capabilities). Styling made with Tailwind CSS
            </p>
            <div className="mt-3 flex flex-row flex-wrap items-center justify-center">
              <img alt="JS Logo" className="m-3 h-20" src={JSLogo} />
              <img alt="React Logo" className="m-3 h-20" src={ReactLogo} />
              <img
                alt="WebSocket Logo"
                className="m-3 h-20"
                src={WebSocketLogo}
              />
              <img
                alt="Tailwind Logo"
                className="m-3 h-20"
                src={TailwindLogo}
              />
            </div>
          </div>
          <div className="flex justify-center lg:justify-start mt-6"></div>
        </div>
      </div>
    </div>
  )
}

export default About
