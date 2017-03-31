# Todo MVC Backend

This example project provides RESTful API endpoints for the to-do list mvc client. 
It uses Express.js, Knex.js, and is backed up by a PostgreSQL database hosted on ElephantSQL

## 1) Install dependencies

``` bash
> npm install
```

## 2) Set up PostgreSQL db using Homebrew (OSX)
#### Install postgres
```bash
> brew update
> brew install postgres
```

#### Basic set up for a local PostgreSQL server
```bash
> echo "export PGDATA=/usr/local/var/postgres" >> ~/.bash_profile
> source ~/.bash_profile
```

#### Create user and database
```bash
> createuser -Pw --interactive
> createdb -U <usernamegoeshere> todo-app
```

#### Start and stop local PostgreSQL db server
```bash
> pg_ctl start -l $PGDATA/server.log
> pg_ctl start
> pg_ctl status
> pg_ctl stop
```
## 3) Set up PostgreSQL db for the todo app
#### Create table and sequence 

```bash
> psql -U <usernamegoeshere> todo-app -f <path-to-schema.sql-file>
```

## 4) Run the server
#### 
```bash
> npm start
```
#### Set the db URL as an environment variable

Alternatively, you could use elephantSQL to set up a postgreSQL database
Or configure access to your local postgreSQL server with the following
```bash
> postgres://<usernamegoeshere>:<passwordgoeshere>@localhost/todo-app
```

## 5) Implement Continuous Integration testing with Travis CI

```bash
> travis setup 
```

## 6) Deploy to Heroku
```bash
> heroku create
> // Copy the new app name and paste it in for the deploy:app: setting in the .travis.yml file
> git push heroku master
> heroku open
```
