## Test

Here's the application for storing + displaying data from a slow API. The source files are found in /src/. To get this app running you need to have mongodb installed, the database can be found in /dump/marketintel/. Set up the database url in /src/server/database.js. 

'npm install' to install dependencies and 'npm run start' to run both applications. Server can be found on localhost:3000 and the client on localhost:8080

## Thoughts

It took me 4-5 hours to complete. The fastest way was to built a proxy api, which would be enough for the requirements, but the reason why I built the project this way is because I think this would be the best approach if the project would grew with more data, users and functionality. I think relaying the API is a bad practice and it's not necessary since the data is added daily and we need to store the data anyway.