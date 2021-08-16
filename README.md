database setup steps
1) Initialize Docker Server locally ( In Terminal )
    - docker pull postgres
    - mkdir -p $HOME/docker/volumes/postgres
    - docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 `
        -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres
    - docker ps -a ( identify created server )
    - docker exec -it <server id> bash
    - psql -U postgres
    - SELECT version();

2) Seed Database using terminal local to the project (knex)
    - npx knex migrate:latest
    - npx knex seed:run

After this, the database should be populated with default data for testing purposes.



