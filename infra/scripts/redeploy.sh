#!/bin/bash

su -c 
id
echo "backend: git pull"
su -c "cd /home/guest/square-booking-app/backend; git pull" -m guest

echo "frontend: git pull"
su -c "cd /home/guest/square-booking-app; git pull" -m guest

echo "Run run_app.sh"
su -c "chmod +x /home/guest/square-booking-app/infra/scripts/run_app.sh" -m guest
su -c "/bin/bash /home/guest/square-booking-app/infra/scripts/run_app.sh" -m guest
