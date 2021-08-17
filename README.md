database setup steps
1) Initialize Docker Server locally ( In Terminal )
    - <code>docker pull postgres</code>
    - <code>mkdir -p $HOME/docker/volumes/postgres</code>
    - <code>docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 `
        -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres</code>
    - <code>docker ps -a</code> ( identify created server )
    - <code>docker exec -it pg-docker bash</code>
    - <code>psql -U postgres</code>
    - <code>CREATE DATABASE project_two;</code>

2) Seed Database using terminal local to the project (knex)
    - npx knex migrate:latest
    - npx knex seed:run

After this, the database should be populated with default data for testing purposes.



