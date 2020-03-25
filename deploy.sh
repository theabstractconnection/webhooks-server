#!/usr/bin/env bash
TARGET=${TARGET:-main}

set -e

if [[ -d $PROJECT_NAME ]]
then
  DEPLOY_TYPE="update"
else
  DEPLOY_TYPE="initialize"
fi

SERVER_USERNAME=$(echo $SERVER_USERNAME | tr -d '\r')
PROJECT_NAME=$(echo $PROJECT_NAME | tr -d '\r')
GIT_URL=$(echo $GIT_URL | tr -d '\r')
TARGET=$(echo $TARGET | tr -d '\r')
DEPLOY_TYPE=$(echo $DEPLOY_TYPE | tr -d '\r')

echo $SERVER_USERNAME
echo $PROJECT_NAME
echo $GIT_URL
echo $TARGET
echo $DEPLOY_TYPE

echo "☠☠☠ UPDATING DOTENVS REPO"
cd ${HOME}/dotenvs
git pull origin master --progress
cd ${HOME}/projects/webhooks-server

if [[ -z "${SERVER_USERNAME}" ]] || [[ -z "${PROJECT_NAME}" ]] || [[ -z "${GIT_URL}" ]]
then
  echo "☠☠☠ REQUIRED VARIABLES ARE NOT PRESENT"
  echo "!!! EXITING"
  exit 1
else
  if [ "$DEPLOY_TYPE" == "initialize" ]; then
    echo "☠☠☠ CLONING ${PROJECT_NAME}" 
    git clone $GIT_URL 2>&1
    cd $PROJECT_NAME
    echo "☠☠☠ LINKING ENV FILE" 
    envs -g
  fi

  if [ "$DEPLOY_TYPE" == "update" ]; then
    echo "☠☠☠ CD INTO ${PROJECT_NAME}" 
    cd $PROJECT_NAME

    echo "☠☠☠ CHECK GIT STATUS" 
    if [ -z "$(git status --porcelain)" ]; then 
      echo "☠☠☠ WORKING DIRECTORY CLEAN" 
      echo "☠☠☠ PULL FROM MASTER" 
      git pull origin master --progress
    else 
      echo "☠☠☠ UNCOMMITED CHANGES"
      echo "!!! EXITING"
      exit 1
    fi
  fi

  if [ "$DEPLOY_TYPE" == "initialize" ]; then
    echo "☠☠☠ PULLING SERVICE'S IMAGES" 
    make project_name=$PROJECT_NAME target=$TARGET pullimages 2>&1
  fi

  echo "☠☠☠ BUILDING SERVICES" 
  make project_name=$PROJECT_NAME target=$TARGET build 2>&1

  echo "☠☠☠ STARTING SERVICES"
  make project_name=$PROJECT_NAME target=$TARGET service 2>&1
  
  if [ "$DEPLOY_TYPE" == "initialize" ]; then
    echo "☠☠☠ POST INSTALL SCRIPT" 
    make project_name=$PROJECT_NAME target=$TARGET postinstall 2>&1
  fi
  
  echo "☠☠☠ SUCCCESS SERVICES STARTED"
  exit 0
fi

