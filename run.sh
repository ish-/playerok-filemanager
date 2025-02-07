docker cp backend/mongodb-init.js playerok-mongodb:/mongodb-init.js
sleep 3 # wait until mongo get up
docker exec -it playerok-mongodb mongo mongodb-init.js

cd backend
npm run start
