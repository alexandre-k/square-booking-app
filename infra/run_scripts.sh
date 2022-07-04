#!/bin/bash

IP_ADDRESS=$1
SSH_KEY_NAME=$2
ssh -i ~/.ssh/$SSH_KEY_NAME root@$IP_ADDRESS < ./scripts/provision.sh
ssh -i ~/.ssh/$SSH_KEY_NAME guest@$IP_ADDRESS < ./scripts/prep_repo.sh
scp -i ~/.ssh/$SSH_KEY_NAME ../.env guest@$IP_ADDRESS:/home/guest/square-booking-app/.env
ssh -i ~/.ssh/$SSH_KEY_NAME guest@$IP_ADDRESS < ./scripts/start_docker.sh
