#!/usr/bin/env bash
PORT=$1
TIMEOUT_IN_SECONDS=$2
ss -tln |grep $PORT
IS_RUNNING=$?
count=0
while [[ $IS_RUNNING -ne 0 ]] && [[ $count -lt $TIMEOUT_IN_SECONDS ]]
do   
  echo "waiting for server to start..."   
  sleep 1
  ss -tln |grep $PORT
  IS_RUNNING=$?
  let count++
done

exit $IS_RUNNING