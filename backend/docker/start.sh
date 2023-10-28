# clone the repository
git clone $GIT_REPOSITORY 
cd Countless/backend

# Remove the frontend because it is not needed in the backend container
rm -rf /app/frontend 
rm -rf docker
rm -rf test

# Install the dependencies
ls -lha
npm install

# Set the environment variables
echo "MONGO_ADMIN_USERNAME=$MONGO_ADMIN_USERNAME" > .env
echo "MONGO_ADMIN_PASSWORD=$MONGO_ADMIN_PASSWORD" >> .env
echo "MONGO_PORT=$MONGO_PORT" >> .env
echo "MONGO_HOST=$MONGO_HOST" >> .env
echo "MONGO_DB=$MONGO_DB" >> .env

echo "CRYPT_SECRET=$CRYPT_SECRET" >> .env
echo "JWT_SECRET=$JWT_SECRET" >> .env
echo "JWT_EXPIRES_IN=$JWT_EXPIRES_IN" >> .env

npm run start:prod