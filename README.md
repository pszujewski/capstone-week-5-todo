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
> createdb todo-app -U <usernamegoeshere>
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
> CREATE SEQUENCE items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
    
> CREATE TABLE items (
    id integer NOT NULL,
    title text NOT NULL,
    completed boolean,
    url text,
    order smallint
);
```

#### Alter items table

```bash
> ALTER SEQUENCE items_id_seq OWNED BY items.id;

> ALTER TABLE ONLY items ALTER COLUMN id SET DEFAULT nextval('items_id_seq'::regclass);

> ALTER TABLE ONLY items ADD CONSTRAINT items_pkey PRIMARY KEY (id);
```

## 4) Run the server
#### 
```bash
> npm start
```
#### Set the db URL as an environment variable

Alternatively, you could also use elephantSQL to set up a postgreSQL database

```bash
% DATABASE_URL=postgres://<usernamegoeshere>:<passwordgoeshere>@localhost/todo-app node server.js
```

## 5) Implement Continuous Integration testing with Travis CI

```bash
> travis setup 
```

```
## 6) Deploy to Heroku
```bash
> heroku create
> // Copy the new app name and paste it in for the deploy:app: setting in the .travis.yml file
> git push heroku master
> heroku open
```
