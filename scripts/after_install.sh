#!/bin/sh
echo "☠☠☠ AFTER INSTALL SCRIPT"
source $HOME/.bashrc
source $HOME/dotfiles/bash_functions

cd /home/ec2-user/dotenvs
git pull origin master 2>&1

echo "☠ GETTING ENV & LINKING ecosystem.config.js"
cd /home/ec2-user/projects/webhooks-server
envs -g
ln -s $HOME/dotenvs/ecosystem.config.js $HOME/projects/webhooks-server/ecosystem.config.js || true

echo "☠ PULLING & STARTING MONGODB CONTAINER"
envs -s prod.docker
target=db make pullimages service