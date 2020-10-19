# reabot-server

> Server side of the Reabot project

## Installation

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

### Start containers

```bash
$ docker-compose build
$ docker-compose up
```
