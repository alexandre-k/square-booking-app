#!/bin/sh

set -e

echo "---- Running frontend entrypoint ----"

if [$NODE_ENV == "development"]; then
    PORT=$PORT yarn start
else
    yarn build
fi
