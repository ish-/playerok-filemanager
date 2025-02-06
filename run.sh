docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=pass mongo:latest

# Create DB, collection and user
docker cp backend/mongodb-init.js mongodb:/mongodb-init.js
sleep 3 # wait until mongo get up
docker exec -it mongodb mongosh --file mongodb-init.js

cd backend
cp .env.example .env 2>/dev/null
npm i
npm run start