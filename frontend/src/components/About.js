import React from 'react'
import AWSLogo from '../assets/images/aws.png'

import BashLogo from '../assets/images/bash.png'
import MakeLogo from '../assets/images/make.png'
import DockerLogo from '../assets/images/docker.png'
import NginxLogo from '../assets/images/nginx.png'

import NodeLogo from '../assets/images/node.svg'
import ExpressLogo from '../assets/images/express.png'
import MongoDbLogo from '../assets/images/mongodb.svg'

import JSLogo from '../assets/images/js.png'
import ReactLogo from '../assets/images/react.png'
import Tailwind from '../assets/images/tailwind.png'

const About = () => {
  return (
    <div className="w-full flex items-center text-center lg:text-left px-8 md:px-12">
      <div className="z-10 m-auto">
        <h2 className="text-center text-3xl font-semibold text-gray-800 md:text-4xl mt-10 mb-20">
          <div>Homemade </div>
          <div className="text-indigo-600">Webhooks deployment server</div>
        </h2>
        <div className="mt-2 text-sm text-whitemd:text-base max-w-3xl">
          <div className="mt-3 mb-6">
            <div className="text-2xl font-semibold text-gray-800">Hosting</div>
            <p className="text-gray-700">
              Hosted on automated aws ec2 instances (setup of instances is fully
              automated by {' '}
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
              <img src={AWSLogo} className="m-3 h-20" />
            </div>
          </div>
          <div className="mt-3 mb-6">
            <div className="text-2xl font-semibold text-gray-800">
              Infrastructure
            </div>
            <p className="text-gray-700">
              Custom Bash script that trigger Make commands (see {' '}
              <a
                className="text-blue-400 underline hover:font-semibold"
                href="https://github.com/theabstractconnection/docker-compose-makefile"
                rel="noopener noreferrer"
              >
                this repository
              </a>{' '}
              for details)to pull/build and start (as services) dockerized
              projects with docker-compose. Projects are mapped to subdomains
              with Nginx reverse proxy
            </p>
            <div className="mt-3 flex flex-row flex-wrap items-center justify-center">
              <img src={BashLogo} className="m-3 h-20" />
              <img src={MakeLogo} className="m-3 h-20" />
              <img src={DockerLogo} className="m-3 h-20" />
              <img src={NginxLogo} className="m-3 h-20" />
            </div>
          </div>
          <div className="mt-3 mb-6">
            <div className="text-2xl font-semibold text-gray-800">
              Backend Server
            </div>
            <p className="text-gray-700">
              NodeJs backend server built with ExpressJs and MongoDB
            </p>
            <div className="mt-3 flex flex-row flex-wrap items-center justify-center">
              <img src={NodeLogo} className="m-3 h-20" />
              <img src={ExpressLogo} className="m-3 h-20" />
              <img src={MongoDbLogo} className="m-3 h-20" />
            </div>
          </div>
          <div className="mt-3 mb-6">
            <div className="text-2xl font-semibold text-gray-800">
              Frontend Application
            </div>
            <p className="text-gray-700">Create React App with Tailwind CSS</p>
            <div className="mt-3 flex flex-row flex-wrap items-center justify-center">
              <img src={JSLogo} className="m-3 h-20" />
              <img src={ReactLogo} className="m-3 h-20" />
              <img src={Tailwind} className="m-3 h-20" />
            </div>
          </div>
          <div className="flex justify-center lg:justify-start mt-6"></div>
        </div>
      </div>
    </div>
  )
}

export default About
