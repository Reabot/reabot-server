# reabot-server

> Server side of the Reabot project

## Installation

```bash
# clone the repository
$ git clone git@github.com:Reabot/reabot-server.git

$ cd reabot-server
```

```bash
# build the containers
$ docker-compose build
```

### Creating a mongodb admin user

```bash
# mongodb container
$ docker container start <CONTAINER_ID>

# exec bash inside the container
$ docker exec -it db_mongo bash

# open mongo shell
$ mongo

# move to admin db
$ use admin

# create user for admin db
$ db.createUser({
  user: 'your-admin-username',
  pwd: 'your-admin-password',
  roles: [
    {
      role: 'readWrite',
      db: 'admin'
    }
  ]
})
```

### Modify .env file

```bash
$ cp .env.example .env

$ nano .env
```

.env file should look like that

```bash
DB_HOST=db:27017
DB_NAME=your-db-name
DB_ADMIN=your-admin-username
DB_PASSWORD=your-admin-password
# DB_PREFIX will be mongodb in local or mongodb+srv otherwise
DB_PREFIX=mongodb

```

### Start containers

```bash
$ docker-compose build
$ docker-compose up
```

### API access

The api will be available on http://localhost:8080 or http://localhost:3000

### API Documentation

The documentation of the api is available on http://localhost:8080/api (depending on the port)
