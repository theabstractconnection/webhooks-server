#!/bin/bash
: ${TARGET:="main"}

set -e

SERVER_USERNAME=$(echo $SERVER_USERNAME | tr -d '\r')
PROJECT_NAME=$(echo $PROJECT_NAME | tr -d '\r')
GIT_URL=$(echo $GIT_URL | tr -d '\r')
TARGET=$(echo $TARGET | tr -d '\r')

echo $SERVER_USERNAME
echo $PROJECT_NAME
echo $GIT_URL
echo $TARGET

if [[ -z "${SERVER_USERNAME}" ]] || [[ -z "${PROJECT_NAME}" ]] || [[ -z "${GIT_URL}" ]]
then
  echo ">>> REQUIRED VARIABLES ARE NOT PRESENT"
  echo "!!! EXITING"
  exit 1
else
  echo ">>> CD INTO /home/${SERVER_USERNAME}" 
  cd "/home/${SERVER_USERNAME}"
  if [[ -d $PROJECT_NAME ]] 
  then
    echo ">>> CD INTO ${PROJECT_NAME}" 
    cd $PROJECT_NAME

    echo ">>> CHECK GIT STATUS" 
    if [ -z "$(git status --porcelain)" ]; then 
      echo ">>>>>> WORKING DIRECTORY CLEAN" 
      echo ">>> PULL FROM MASTER" 
      git pull origin master --progress
    else 
      echo ">>>>>> UNCOMMITED CHANGES"
      echo "!!!!!! EXITING"
      exit 1
    fi
  else  
    echo ">>> CLONING ${PROJECT_NAME}" 
    git clone $GIT_URL
  fi

  echo ">>> BUILDING SERVICES" 
  make project_name=$PROJECT_NAME target=$TARGET build 2>&1

  echo ">>> STARTING SERICES"
  make project_name=$PROJECT_NAME target=$TARGET service 2>&1
  
  echo ">>> SUCCCESS SERVICES STARTED"
  exit 0
fi

