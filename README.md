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

# Architecture

## C4 diagrams of the application

## How would you improve the API? Reasoning around the design choices and tradeoffs

This API is a perfect fit for the requirements. If the requirements changes some additions should be considered depending on the expected load and planned feature development.

- Add readiness/liveness health checks. It is crucial for complex apps, especially when working with container orchestration systems like kubernetes.
- Add monitoring, logging and tracing. Needless to say that without those tools debugging is next to impossible. Depending on the applocaion size and budget different options are available.
- Add tools for documentation and API definition. Swagger is a good default choice. GraphQL is another. Depends on the use case.
- Add pagination to '/lime/muy' and '/lime/all' endpoints.
- Change the the User table so that we don't store passwords in plain text. Instead we should use a library like bcrypt, with a salted one-way hash algorithm. With that approach, we only store hashed passwords, and then compare the stored password to a hashed version of the incoming password, thus never storing or exposing user passwords in plain text.
- Change package manager from npm to yarn v3 plung and play. This can resolve several issues with the node module resolution, as well as make CI/CD pipeline a lot faster.
- Use Fastify platform for Nestjs instead of Epress. While fastify doesn't support the middleware pattern, it give us a much faster HTTP server that beats express in all benchmarks.
- Use BDD testing approach instead of writng unit tests. Writing test cases in general human-like syntax is much better in terms of reusability and also the barrier to entry becomes low. A QA engineer or PO or some manager can look and understand the tests, as well as, add new scenarios.

The above list is not comprehensive. More things can be done to improve the app.

All of the above improvements increase the complexity of the app (expect for the BDD tests). They also add to the development time needed and infrastructure costs.

## Your strategy for Continuous Integration of the API

Continues Integration is development practice of merging the development copy of the code with the "main" verion several times per day (or at least once). It implies that a version of the code exists that is not the same as the "main" version. This happens when a developer start to work on a new feature on his machine and his working copy of the source code starts to diverge from the original. At some point it should be "merged" with the "main" code. This is when a Pull Request / Merge Request is created and other developers review and approve the changes.

Historically, software engineers adopted the "Git Flow Workflow" with "development", "staging" and "production" enviroments. This means that several times per sprint new features are merged into the development branch, once per sprint all new features are merged from development into the staging branch, features are tested there and then once per sprint the changes are released to production. This approach is now considered legacy as it doesn't follow the Continues Integration idea very well. Ofeten times the feature branches den't get merged for 1 or 2 or 3 weeks. Furthermore, the development and staging branches are actually 2 separate sources of the truth. This means that if my feature works fine in development, it doesn't mean that it will work the same in staging because the context is different.

It is becomming more and more popular to use a different approach to development: "trunk based development". In this approach there is only 1 main branch and the feature branches are more shortly lived. Pair programming is encouraged and even merging directly to the main branch without PRs or MRs.
Often times merging several times a day is not possible without merging unfinished features. In order to be able to do this we need a mechanism to disable unfinished parts of our code and make it invisible to the users. This is why we need Feature Flags. They are often combines with the trunk based development approach in order to achiave a TRUE CONTINUES INTEGRATION approach. There is only 1 source of truth and we are integrating our changes with it several times per day!

Furthering the topic of the CI, there is also Continues Delivery and Continues Deployment.

Continues Delivery allows us to have our source always in a releasable state, even when features are not fully done. This is achieved with the above mentioned feature flags and rigorous testing, hopefully using the BDD approach. After integration, our pipelines are triggered, we are testing and producing a deployable artifact.

Continues Deployment means that at any point we can release our software to our clients. Basically getting our artifact and pushing it into the production environment.

Having said all of the above. In my opinion, the current best practice to CI is to setup a GitLab, Github or any other tool in such a way that it will allow us to integrate changes several times per day, hide them from the users and test as much as possible so that we are confident that whatever we ship to production envinment is working properly. Using only 1 main branch instead of 2 is much simpler and the initial cost of setup is quicly repaid during the development phase.

TLDR:

- Use 1 branch only: trunk, main, whatever;
- Merge feature branch at least 1 time per day or use pair programming to push chances directly to the main branch;
- Use feature flags to hide unfinished/untested code;
- Use BBD/TDD/Unit tests/E2E test, whatever means possible to get more feedback that your code is working correctly.

## Your strategy for Scalability of the service

There are only 2 ways to scale an application: vertical or horizontal. Depending on the requirements and the expected load, either one can be correct.
Most medium to large comapnies nowadays use horizontal scaling with container orchestration systems like kubernetes. It allows for automatic increase/decrease the number of the replicas (containers/pods) of the applicaiton depending on the load or custom conditions. There is a posibility of zero downtime deployments, given that we follow strict backwards compatibility policies.
Health checks, monitoring and logging are essential for the above mentioned approach. Kubernetes has recommended solutions to all of those problems.

## How would you approach making this service paid? How would the architecture change?

One way to make the service paid is to limit the number of requests to the /lime/eth/:rlphex and other endpoints and make pre-paid plans with limits on the amount of calls.

Doing this will require changes to the DB, mainly adding a new table or integrating a 3rd party solution. This wouldn't change the architecture too much, however, it will add a medium amount of complexity to our service.

## How would you approach failing Ethereum Node URL?

I would return an http 503 response "Service Unavailable" in any case.

Furthermore, I would add several ETH_NODE_URLs, one main and 1 or 2 backups, hopefully from a different providers to access to the Ethereum node.

Yet again, this would increase the complexity of the App.
