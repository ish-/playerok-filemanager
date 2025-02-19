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

echo "\n--- Creating mongodb user and resetting collection..."
RUN docker cp backend/mongodb-init.js playerok-mongodb:/mongodb-init.js
sleep 1 # wait until mongo get up
RUN docker exec -it playerok-mongodb mongo mongodb-init.js

echo "\n--- Running..."
cd backend
npm run start
