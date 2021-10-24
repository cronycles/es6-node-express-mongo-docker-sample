es6-node-express-mongo-docker-sample
===============

## What is

It is a sample page where you can upload your CV (with drag and drop funcionality) and email sending with database saving data. All using Docker.

## Technologies

- NodeJS
- Express 
- Mongodb
- Docker

## Getting Started
The app can be started in 2 ways: with docker or without:

### With Docker
- Open up ```app.js``` file 
- Find the variable called ```mongoDBconnectionString``` 
- Fe sure ```mongoDBconnectionString```  is assigned the value of```mongoDBconnectionStringDocker```

``` 
docker-compose up
```
You can see the page on http://localhost:7500/

### Without Docker
- Open up ```app.js``` file 
- Find the variable called ```mongoDBconnectionString``` 
- Fe sure ```mongoDBconnectionString```  is assigned the value of```mongoDBconnectionStringLocal```
- Launch npm script called ```dev with browser sync```

You can see the page on http://localhost:3000/