#!/bin/bash
APP_NAME=${PWD##*/} 
PM2_EXECUTABLE="/home/ec2-user/.yarn/bin/pm2"
APPLICATION_PATH="/home/ec2-user/projects/webhooks-server/"

echo ">>> START SCRIPT"
cd "${APPLICATION_PATH}"


echo ">>> APP_NAME = ${APP_NAME}"

${PM2_EXECUTABLE} describe "${APP_NAME}" > /dev/null
RUNNING=$?

if [ "${RUNNING}" -ne 0 ]; then
  echo ">>> PM2 START"
  ${PM2_EXECUTABLE} start server.js --name "${APP_NAME}"
else
  echo ">>> PM2 RESTART"
  ${PM2_EXECUTABLE} restart "${APP_NAME}"
fi;