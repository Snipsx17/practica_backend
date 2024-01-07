# Node Pop

Website and Aplication.

###Install

Install dependencies:

```sh
$ npm install
```

### Init DB

Start a MongoDB Server in MacOS or Linux

Form the folder of the server:

```sh
./bin/mongod -dbpath ./data/db
```

_Review DB conection ./lib/connectMongoose.js_

Create schema and load initial data

```sh
## this command delete all the data in DB and add default data
$ npm run initDB.js
## press 'y' for accept or 'n' for decline
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

### API Endpoint's

**GET /apiv1/authenticate**

you can send creadencials:

- header Authorization
- body format '_x-www-form-urlencoded_'
- query string \_/apiv1/authenticate?jwt={token}

you will recibe a JWT token

```sh
    {token: tokenJWT}
```

on protected enpoint's you should set the 'Authorization' header whith the token provided

**GET /apiv1/anuncios/ 🔐**
_List all adverts_
http://localhost:3000/apiv1/anuncios

**GET /apiv1/anuncios/id/{advertID} 🔐**
_Search advert by ID_
http://localhost:3000/apiv1/anuncios/id/{advertID}

**POST /apiv1/anuncios 🔐**
_Create advert_
Send a POST peticion with the body on 'form-data', fields required:

```js
{
    nombre: string,
    venta: boolean,
    precio: number,
    imagen: file,
    tags: [tags]
}
```
