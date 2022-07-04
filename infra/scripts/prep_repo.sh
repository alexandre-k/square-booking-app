#!/bin/bash

su - guest
git clone https://github.com/alexandre-k/square-booking-app.git
cd ~/square-booking-app/
git submodule update --init
