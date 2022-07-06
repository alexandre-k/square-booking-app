#!/bin/sh

set -e

echo "---- Running frontend entrypoint ----"

PORT=$PORT yarn start
