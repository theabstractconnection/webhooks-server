#!/bin/bash
APP_NAME="webhooks-server"
APPLICATION_PATH="/home/ec2-user/projects/webhooks-server/"

APP_NAME="webhooks-server"
APPLICATION_PATH="/home/ec2-user/projects/${APP_NAME}/"

echo "ENV : APP_NAME = ${APP_NAME}"
echo "ENV : APPLICATION_PATH = ${APPLICATION_PATH}"

echo ">>> STOP SCRIPT"
cd "${APPLICATION_PATH}"
/opt/pm2/pm2 stop "${APP_NAME}" || true