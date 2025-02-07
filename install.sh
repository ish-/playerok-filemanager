docker run -d --name playerok-mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=pass mongo:4.4

cd backend
cp -n .env.example .env 2>/dev/null
npm i
