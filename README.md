<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Installation

```bash
# Install dependencies
npm install

# configure environment
cp .env.example .env
```

## Running the app

```bash
# development with docker compose
npm run dockerize

# development
npm run start:prod

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Dockerize

```bash
# build image
docker build -t limeapi -f ./docker/Dockerfile.prod .
# run the container
docker run \
  -e DB_CONNECTION_URL='' \
  -e ETH_NODE_URL='' \
  -p 3000:3000 \
  limeapi

# To run with a local docker DB create a network
docker network create limeapi_net
# link DB container to the network
docker network connect limeapi_net db_container
# Run the container with --network flag
docker run --network limeapi_net ...etc
```

## Migrations

For local testing of the migrations, start up the docker compose DB image

```bash
npm run dockerize efdatabase
```

Build the application before running the migrations commands

```bash
npm run build
```

```bash
# Manually create a new migration
npm run migrations:create ./src/migrations/{name_of_migration}

# Automatically generate migration based on the changes to Entities
npm run migrations:generate ./src/migrations/{name_of_migration}

# Run migrations
npm run migrations:run

# Revert the migrations
npm run migrations:revert
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
