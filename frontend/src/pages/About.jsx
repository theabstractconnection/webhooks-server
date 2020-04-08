import PropTypes from 'prop-types'
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

const imageShape = PropTypes.arrayOf(
  PropTypes.arrayOf(PropTypes.string.isRequired, PropTypes.string.isRequired)
).isRequired

const LogoArray = (props) => {
  const { images } = props
  return (
    <div className="mt-3 flex flex-row flex-wrap items-center justify-center">
      {images.map((image) => (
        <img
          key={image[0]}
          alt={image[0]}
          className="m-3 h-20"
          src={image[1]}
        />
      ))}
    </div>
  )
}

LogoArray.propTypes = {
  images: imageShape,
}

const Section = (props) => {
  const { title, children, images } = props
  return (
    <div className="mt-3 mb-6">
      <div className="text-2xl font-semibold text-gray-800">{title}</div>
      <p className="text-gray-700">{children && children}</p>
      <LogoArray images={images} />
    </div>
  )
}

Section.propTypes = {
  images: imageShape,
  title: PropTypes.string.isRequired,
}

const About = () => {
  return (
    <div className="w-full flex items-center text-center lg:text-left px-8 md:px-12">
      <div className="z-10 m-auto">
        <h2 className="text-center text-3xl font-semibold text-gray-800 md:text-4xl mt-10 mb-20">
          <div>Homemade </div>
          <div className="text-indigo-600">Webhooks deployment server</div>
        </h2>
        <div className="mt-2 mb-20 text-sm text-whitemd:text-base max-w-3xl">
          <Section images={[['AWS Logo', AWSLogo]]} title="Hosting">
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
          </Section>
          <Section
            images={[
              ['Bash Logo', BashLogo],
              ['Make Logo', MakeLogo],
              ['Docker Logo', DockerLogo],
              ['Nginx Logo', NginxLogo],
            ]}
            title="Infrastructure"
          >
            Custom Bash script that trigger Make commands (see{' '}
            <a
              className="text-blue-400 underline hover:font-semibold"
              href="https://github.com/theabstractconnection/docker-compose-makefile"
              rel="noopener noreferrer"
            >
              this repository
            </a>{' '}
            for details) to pull/build and start (as services) dockerized
            projects with docker-compose. Projects are mapped to subdomains with
            Nginx reverse proxy
          </Section>
          <Section
            images={[
              ['Node Logo', NodeLogo],
              ['ExpressLogo', ExpressLogo],
              ['MongoDbLogo', MongoDbLogo],
            ]}
            title="Backend Server"
          >
            NodeJs backend server built with ExpressJs and MongoDB (it also
            spawn a websocket server to broadcast deploments and deployments
            logs)
          </Section>
          <Section
            images={[
              ['JS Logo', JSLogo],
              ['React Logo', ReactLogo],
              ['WebSocket Logo', WebSocketLogo],
              ['Tailwind Logo', TailwindLogo],
            ]}
            title="Frontend Application"
          >
            Create React App that use Websocket (to provide live logging
            capabilities). Styling made with Tailwind CSS
          </Section>
        </div>
      </div>
    </div>
  )
}

export default About
