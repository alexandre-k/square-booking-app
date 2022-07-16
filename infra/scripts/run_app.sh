#/bin/bash

function stop_docker () {
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
           --env-file .env \
           --hostname unboxed_backend \
           --name unboxed_backend \
           -t kmalexandre/square-booking-api:latest
}

function start_frontend () {
    docker pull kmalexandre/square-booking-app:latest
    docker run \
           -d \
           -p 80:80 \
           -p 443:443 \
           -v /home/guest/certs:/etc/nginx/certs \
           --hostname unboxed_frontend \
           --name unboxed_frontend \
           -t kmalexandre/square-booking-app:latest
}

function start_database() {
    docker pull mongo
    docker run \
           -d \
           -p 27017:27017 \
           -p 27018:27018 \
           -p 27019:27019 \
           --env-file .env \
           -e MONGO_INITDB_DATABASE=$MONGODB_DATABASE \
           -e MONGO_INITDB_ROOT_USERNAME=$MONGODB_USER \
           -e MONGO_INITDB_ROOT_PASSWORD=$MONGODB_PASSWORD \
           -v /home/guest/database:/data/db \
           --hostname unboxed_database \
           --name unboxed_database \
           -t mongo
}

stop_docker "kmalexandre/square-booking-api:latest"
stop_docker "kmalexandre/square-booking-app:latest"
stop_docker "mongo"

refresh_repo

start_database
start_backend
start_frontend
