#!/bin/bash
echo "☠☠☠ AFTER INSTALL SCRIPT"
source $HOME/.bashrc

cd /home/ec2-user/envs
git pull origin master 2>&1

cd /home/ec2-user/projects/webhooks-server/scripts
ln -s /home/ec2-user/envs/ecosystem.config.js /home/ec2-user/projects/webhooks-server/ecosystem.config.js || true
