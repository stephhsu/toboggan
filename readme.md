# Getting Started for local development

## Install postgres

- Install [docker](https://docs.docker.com/desktop/mac/install/)

- Make local directory to store your postgres data:

  - `mkdir -p $HOME/pgdata`

- Run docker image with volume mount that will save the data to your local directory

```
docker run \
  -d \
  --name pg-toboggan \
  -p 5432:5432 \
  -e POSTGRES_PASSWORD=toboggan \
  -v $HOME/pgdata:/var/lib/postgresql/data \
  postgres
```

- TODO: Further database setup instructions

## Set up project

- Make sure you have node downloaded

- Download nodemon

- Clone the repository

  - `cd toboggan`

  - `npm install`

  - `npm run dev`

\*(Optional) Install and run pgadmin4: `docker run --rm -p 5050:5050 thajeztah/pgadmin4`
\*\*You can go to [http://localhost:5050](http://localhost:5050) to manage your postgres with pgadmin
