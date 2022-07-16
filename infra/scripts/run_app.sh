#/bin/bash

function stop_docker () {
    docker stop $(docker ps -a -q --filter ancestor="$1" --format="{{.ID}}")
    docker rm $(docker ps -a -q --filter ancestor="$1" --format="{{.ID}}")
}

function refresh_repo() {
    cd /home/guest/square-booking-app
    git pull
}

function start_backend () {
    docker pull kmalexandre/square-booking-api
    docker run \
           -d \
           -p 8000:8000 \
           --env-file /home/guest/square-booking-app/.env \
           --hostname unboxed_backend \
           --name unboxed_backend \
	         --network unboxed \
           -t kmalexandre/square-booking-api:latest
}

function start_frontend () {
    docker pull kmalexandre/square-booking-app:latest
    docker run \
           -d \
           -p 80:80 \
           -p 443:443 \
           --env-file /home/guest/square-booking-app/.env \
           -v /home/guest/certs:/etc/nginx/certs \
           --hostname unboxed_frontend \
           --name unboxed_frontend \
	         --network unboxed \
           -t kmalexandre/square-booking-app:latest
}

function start_database() {
    docker pull mongo
    docker run \
           -d \
           -p 27017:27017 \
           -p 27018:27018 \
           -p 27019:27019 \
           --env-file /home/guest/square-booking-app/.env \
           -v /home/guest/database:/data/db \
           --hostname unboxed_database \
	         --network unboxed \
           --name unboxed_database \
           -t mongo
}

docker network create unboxed

stop_docker "kmalexandre/square-booking-api:latest"
stop_docker "kmalexandre/square-booking-app:latest"
stop_docker "mongo"

refresh_repo

start_database
start_backend
start_frontend
