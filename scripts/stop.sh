#!/bin/bash
APP_NAME="webhooks-server"
APPLICATION_PATH="/home/ec2-user/projects/${APP_NAME}/"

echo "ENV : APP_NAME = ${APP_NAME}"
echo "ENV : APPLICATION_PATH = ${APPLICATION_PATH}"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

echo ">>> STOP SCRIPT"
cd "${APPLICATION_PATH}"
/opt/pm2/pm2 stop "${APP_NAME}" || true