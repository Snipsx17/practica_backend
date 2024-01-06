# Node Pop

Website and Aplication.

###Install

Install dependencies:

```sh
$ npm install
```

### Init DB

_Review DB conection ./lib/connectMongoose.js_

Create schema and load initial data

```sh
## this command delete all the data in DB and add default data
$ npm run initDB.js
## press y for accept or n for decline
```

### Start

In production:

```sh
npm start
```

In development:

```sh
npm run dev
```

### Start a MongoDB Server in MacOS or Linux

Form the folder of the server:

```sh
./bin/mongod -dbpath ./data/db
```

### API Endpoint's

### GET /apiv1/anuncios/

Lista todos los anuncios
http://localhost:3000/apiv1/anuncios

Busqueda por ID
http://localhost:3000/apiv1/anuncios/id/6522f109bccfd33825b3fa31

### POST /apiv1/anuncios/{id}

Enviar una peticion POST con los datos en el cuerpo de la peticion
