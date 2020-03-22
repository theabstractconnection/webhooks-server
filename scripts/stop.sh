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
/opt/bin/pm2 describe "${APP_NAME}" > /dev/null
RUNNING=$?
if [ "${RUNNING}" -ne 0 ]; then
  echo "☠☠☠ NOT RUNNING"
else
  echo "☠☠☠ PM2 STOP"
  /opt/bin/pm2 stop "${APP_NAME}" || true
fi;