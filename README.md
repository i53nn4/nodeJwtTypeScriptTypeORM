# Node.js + TypeScript + TypORM + Postgres

> Rename file env_example to .env

## Start project

Building an image

```sh
$ docker compose build
```

Running a container

```sh
$ docker compose up -d
```

Running the migration

```sh
$ npm run typeorm migration:run
```

Stopping a container

```sh
$ docker compose down
```

