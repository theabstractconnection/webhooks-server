#!/bin/bash
APP_NAME="webhooks-server"
PM2_EXECUTABLE="/home/ec2-user/.yarn/bin/pm2"
APPLICATION_PATH="/home/ec2-user/projects/${APP_NAME}/"

echo "ENV : APP_NAME = ${APP_NAME}"
echo "ENV : PM2_EXECUTABLE = ${PM2_EXECUTABLE}"
echo "ENV : APPLICATION_PATH = ${APPLICATION_PATH}"

echo ">>> START SCRIPT"
cd "${APPLICATION_PATH}"
${PM2_EXECUTABLE} describe "${APP_NAME}" > /dev/null
RUNNING=$?
if [ "${RUNNING}" -ne 0 ]; then
  echo ">>> PM2 START"
  ${PM2_EXECUTABLE} start server.js --name "${APP_NAME}"
else
  echo ">>> PM2 RESTART"
  ${PM2_EXECUTABLE} restart "${APP_NAME}"
fi;