# reabot-server

> Server side of the Reabot project

## Demo

https://reabot.xyz

## Installation

```bash
# clone the repository
$ git clone git@github.com:Reabot/reabot-server.git

$ cd reabot-server
```

### Modify .env file

```bash
$ cp .env.example .env

$ nano .env
```

.env file should look like that

```bash
# For Docker, please user host.docker.internal instead of localhost

DB_URI=mongodb://<USERNAME>:<PASSWORD>@localhost:27017/<DB_NAME>?authSource=admin

or

DB_URI=mongodb://localhost:27017/<DB_NAME>
```

## Simple usage

### Development

```
$ yarn run start:dev
```

### Production

```
$ yarn run build
$ yarn run start:prod
```

## Using Docker

### Development environment

```bash
# build the containers
$ docker-compose -f docker-compose.dev.yml build
$ docker-compose -f docker-compose.dev.yml up
```

### Development environment

```bash
# build the containers
$ docker-compose -f docker-compose.prod.yml build
$ docker-compose -f docker-compose.prod.yml up
```

### API access

The api will be available on http://localhost:3000

### API Documentation

The documentation of the api is available on http://localhost:3000/api
