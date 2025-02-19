#!/bin/bash

RUN() {
    OUTPUT=$("$@" 2>&1)  # Capture both stdout and stderr
    EXIT_CODE=$?
    echo "> $@"
    if [ $EXIT_CODE -ne 0 ]; then
        echo "$OUTPUT"  # Print the command output
        echo "!!! ERROR"
        exit $EXIT_CODE  # Exit if the command failed
    fi
}

RUN git pull origin main | grep -q 'Already up to date'
if [ $? -ne 0 ]; then
    exec "$0"
    exit
fi

echo "\n--- Removing existing container 'playerok-mongodb'..."
RUN docker stop playerok-mongodb
RUN docker rm playerok-mongodb
echo "\n--- Installing legacy mongo 4.4 for non-avx cpu..."
# docker run -d --name playerok-mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=pass mongo:4.4
RUN docker run -d --name playerok-mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=pass mongo:4.4

echo "\n--- Docker configuration done."

echo "\n--- Configuring backend..."
cd backend
RUN npm i
echo "\n--- Copying .env.example to .env if .env doesn't exist..."
cp -n .env.example .env 2>/dev/null
echo "\n--- Please make adjustments to .env file!"
