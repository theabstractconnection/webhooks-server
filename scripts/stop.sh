#!/bin/bash
echo ">>> STOP SCRIPT"
cd /home/ec2-user/projects/webhooks-server/

APP_NAME=${PWD##*/} 
pm2 stop "${APP_NAME}" || true