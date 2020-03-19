#!/bin/bash
APP_NAME=${PWD##*/} 
PM2_EXECUTABLE="/home/ec2-user/.yarn/bin/pm2"
APPLICATION_PATH="/home/ec2-user/projects/webhooks-server/"

echo ">>> STOP SCRIPT"
cd "${APPLICATION_PATH}"


${PM2_EXECUTABLE} stop "${APP_NAME}" || true