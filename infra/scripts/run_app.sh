#/bin/bash

function stop_docker () {
    docker stop $(docker ps -a -q --filter ancestor="$1" --format="{{.ID}}")
}

function refresh_repo() {
    cd /home/guest/square-booking-app
    git pull
}

function start_backend () {
    docker pull kmalexandre/square-booking-api
    docker run -d -p 8000:8000 --env-file .env -t kmalexandre/square-booking-api:latest
}

function start_frontend () {
    docker pull kmalexandre/square-booking-app:latest
    docker run -d -p 80:80 -p 443:443 -v /home/guest/certs:/etc/nginx/certs -t kmalexandre/square-booking-app:latest
}

stop_docker "kmalexandre/square-booking-api:latest"
stop_docker "kmalexandre/square-booking-app:latest"

refresh_repo

start_backend
start_frontend
