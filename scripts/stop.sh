#!/bin/bash
APP_NAME="webhooks-server"
PM2_EXECUTABLE="/home/ec2-user/.yarn/bin/pm2"
APPLICATION_PATH="/home/ec2-user/projects/webhooks-server/"

APP_NAME="webhooks-server"
PM2_EXECUTABLE="/home/ec2-user/.yarn/bin/pm2"
APPLICATION_PATH="/home/ec2-user/projects/${APP_NAME}/"

echo "ENV : APP_NAME = ${APP_NAME}"
echo "ENV : PM2_EXECUTABLE = ${PM2_EXECUTABLE}"
echo "ENV : APPLICATION_PATH = ${APPLICATION_PATH}"

echo ">>> STOP SCRIPT"
cd "${APPLICATION_PATH}"
${PM2_EXECUTABLE} stop "${APP_NAME}" || true