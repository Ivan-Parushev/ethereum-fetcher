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

## Configuration

> | Syntax            | Default    | Description                                                                  |
> | ----------------- | ---------- | ---------------------------------------------------------------------------- |
> | DB_CONNECTION_URL | N/a        | Text                                                                         |
> | ETH_NODE_URL      | N/a        | Infura or Alchemy API key                                                    |
> | JWT_SECRET        | swordfish  | JWT secret key, used to sign the JWT token. Should be long and secure string |
> | AUTH_HEADER       | AUTH_TOKEN | Custom authorization header name                                             |
> | API_PORT          | 3000       | App listen on Port                                                           |

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

## API

### Auth Module

<details>
 <summary><code>POST</code> <code><b>/lime/authenticate</b></code></summary>

#### Responses

| http code | content-type                    | response                                        |
| --------- | ------------------------------- | ----------------------------------------------- |
| 200       | application/json; charset=utf-8 | `{"token":"JWT token"}`                         |
| 401       | application/json; charset=utf-8 | `{"statusCode":"401","message":"Unauthorized"}` |

#### Example cURL

```bash
curl -X POST -H 'Content-Type: application/json' -d '{"username":"alice","password":"alice"}' http://localhost:3000/lime/authenticate
```

</details>

### Eth Module

<details>
 <summary><code>GET</code> <code><b>/lime/eth/:rlphex</b></code></summary>

#### Qeury Parameters

| name   | type     | data type | description                                                          |
| ------ | -------- | --------- | -------------------------------------------------------------------- |
| rlphex | required | string    | hexadecimal representation of RLP encoded list of transaction hashes |

#### Responses

| http code | content-type                    | response                                        |
| --------- | ------------------------------- | ----------------------------------------------- |
| 200       | application/json; charset=utf-8 | `{ transactions: [...]}`                        |
| 401       | application/json; charset=utf-8 | `{"statusCode":"401","message":"Unauthorized"}` |

#### Example cURL

If you are provide a header "AUTH_TOKEN" with the value of your JWT token from '/lime/authenticate', this endpoint will return the same result, however, the transactions will be added to your request history and available at /lime/my endpoint.

```bash
curl -H 'Content-Type: application/json' -H 'AUTH_TOKEN: ${tolen_value}' http://localhost:3000/lime/eth/f90110b842307839623266366133633265316165643263636366393262613636366332326430353361643064386135646137616131666435343737646364363537376234353234b842307835613537653330353163623932653264343832353135623037653762336431383531373232613734363534363537626436346131346333396361336639636632b842307837316239653262343464343034393863303861363239383866616337373664306561633062356239363133633337663966366639613462383838613862303537b842307863356639366266316235346433333134343235643233373962643737643765643465363434663763366538343961373438333230323862333238643464373938
```

</details>

</details>

<details>
 <summary><code>GET</code> <code><b>/lime/all</b></code></summary>

#### Responses

| http code | content-type                    | response                 |
| --------- | ------------------------------- | ------------------------ |
| 200       | application/json; charset=utf-8 | `{ transactions: [...]}` |

#### Example cURL

```bash
curl -H 'Content-Type: application/json' http://localhost:3000/lime/all
```

</details>

### User Module

<details>
 <summary><code>GET</code> <code><b>/lime/my</b></code></summary>

#### Responses

| http code | content-type                    | response                                        |
| --------- | ------------------------------- | ----------------------------------------------- |
| 200       | application/json; charset=utf-8 | `{ transactions: [...]}`                        |
| 401       | application/json; charset=utf-8 | `{"statusCode":"401","message":"Unauthorized"}` |

#### Example cURL

```bash
curl -H 'Content-Type: application/json' -H 'AUTH_TOKEN: ${tolen_value}' http://localhost:3000/lime/my
```

</details>

<details>
 <summary><code>GET</code> <code><b>/lime/profile</b></code></summary>

#### Responses

| http code | content-type                    | response                                        |
| --------- | ------------------------------- | ----------------------------------------------- |
| 200       | application/json; charset=utf-8 | `{"id":1,"username":"alice"}`                   |
| 401       | application/json; charset=utf-8 | `{"statusCode":"401","message":"Unauthorized"}` |

#### Example cURL

```bash
curl -H 'Content-Type: application/json' -H 'AUTH_TOKEN: ${tolen_value}' http://localhost:3000/lime/profile
```

</details>

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
