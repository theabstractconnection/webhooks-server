#!/bin/bash
APP_NAME="webhooks-server"
APPLICATION_PATH="/home/ec2-user/projects/${APP_NAME}/"

echo "☠☠☠ STOP SCRIPT"
echo "ENV : APP_NAME = ${APP_NAME}"
echo "ENV : APPLICATION_PATH = ${APPLICATION_PATH}"

# NEEDED FOR FINDING NODE 
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

echo "☠☠☠ PM2 STOP"
cd "${APPLICATION_PATH}"
/opt/bin/pm2 stop ecosystem.config.js --only "${APP_NAME}"