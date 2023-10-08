# Node Pop

Website and Aplication.

##install

Install dependencies:

```sh
$ npm install
```

Review DB conection ./lib/connectMongoose.js

## Init DB

Create schema and load initial data

```sh
## this command delete all the data in DB and add default data
$ npm run initDB.js
```

## Start

In production:

```sh
npm start
```

In development:

```sh
npm run dev
```

## Start a MongoDB Server in MacOS or Linux

Form the folder of the server:

```sh
./bin/mongod -dbpath ./data/db
```

## API Endpoint

### GET /apiv1/anuncios/
