#!/usr/bin/env node

cd server
echo 'Starting server on port 3001'
npm start &
cd ../upload-client
npm start