#!/bin/bash

echo "cd to backend"
cd /home/guest/square-booking-app/backend
echo "backend: git pull"
git pull
echo "cd frontend"
cd ..
echo "frontend: git pull"
git pull
echo "Change run_app.sh as executable"
chmod +x ./infra/scripts/run_app.sh
echo "Run run_app.sh"
./infra/scripts/run_app.sh
