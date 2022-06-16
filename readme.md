# Getting Started for local development
## Install postgres

* Install 	[docker](https://docs.docker.com/desktop/mac/install/)

* Make local directory to store your postgres data:

  * `mkdir -p $HOME/pgdata`

* Run docker image with volume mount that will save the data to your local directory
```
docker run \
  -d \
  --name pg-toboggan \
  -p 5432:5432 \
  -e POSTGRES_PASSWORD=toboggan \
  -v $HOME/pgdata:/var/lib/postgresql/data \
  postgres
```

* TODO: Further database setup instructions

## Set up project
* Make sure you have node downloaded

* Clone the repository

  * `cd toboggan`

  * `npm install`

  * `node app.js`

* For a live-updating server, you can download nodemon and run
`nodemon app.js`





