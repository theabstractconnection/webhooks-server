#!/bin/bash
echo ">>> START SCRIPT"
cd /home/ec2-user/projects/webhooks-server/

APP_NAME=${PWD##*/} 
echo ">>> APP_NAME = ${APP_NAME}"

pm2 describe "${APP_NAME}" > /dev/null
RUNNING=$?

if [ "${RUNNING}" -ne 0 ]; then
  echo ">>> PM2 START"
  pm2 start server.js --name "${APP_NAME}"
else
  echo ">>> PM2 RESTART"
  pm2 restart "${APP_NAME}"
fi;