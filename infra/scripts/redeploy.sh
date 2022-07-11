#!/bin/bash

cd /home/guest/square-booking-app/backend
git pull
cd ..
git pull
chmod +x ./infra/scripts/run_app.sh
./infra/scripts/run_app.sh
