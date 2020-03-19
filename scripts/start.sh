#!/bin/bash
APP_NAME="webhooks-server"
APPLICATION_PATH="/home/ec2-user/projects/${APP_NAME}/"

echo "ENV : APP_NAME = ${APP_NAME}"
echo "ENV : APPLICATION_PATH = ${APPLICATION_PATH}"

echo ">>> START SCRIPT"
cd "${APPLICATION_PATH}"
npx pm2 describe "${APP_NAME}" > /dev/null
RUNNING=$?
if [ "${RUNNING}" -ne 0 ]; then
  echo ">>> PM2 START"
  npx pm2 start server.js --name "${APP_NAME}"
else
  echo ">>> PM2 RESTART"
  npx pm2 restart "${APP_NAME}"
fi;