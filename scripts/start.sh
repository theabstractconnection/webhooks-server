#!/bin/sh
APP_NAME="webhooks-server"
APPLICATION_PATH="/home/ec2-user/projects/${APP_NAME}/"

echo "☠☠☠ START SCRIPT"
echo "ENV : APP_NAME = ${APP_NAME}"
echo "ENV : APPLICATION_PATH = ${APPLICATION_PATH}"

# NEEDED FOR FINDING NODE 
source $HOME/.bashrc

cd "${APPLICATION_PATH}"
pm2 describe "${APP_NAME}" > /dev/null
RUNNING=$?
if [ "${RUNNING}" -ne 0 ]; then
  echo "☠ PM2 START"
  pm2 start ecosystem.config.js --only "${APP_NAME}" --env production
else
  echo "☠ PM2 RESTART"
  pm2 restart ecosystem.config.js --only "${APP_NAME}" --env production
fi;
