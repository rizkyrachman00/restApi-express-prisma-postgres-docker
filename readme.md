Link NVM : https://github.com/coreybutler/nvm-windows

=== Command Prompt NVM ===
nvm -v
nvm install [node version]
nvm use [node version]
nvm list
nvm --help


=== Initialize Node Project ===
npm init -y

=== Initialize Prisma Schema ===
npx prisma init
npx prisma generate -> config for prisma schema


=== build docker ===
docker compose build
docker compose run app npx prisma migrate dev --name init -> make migrate history
docker compose up -> run all container
docker compose up -d -> run all container (detach)

=== interaction postgres via terminal ===
docker exec -it postgres-db psql -U postgres -d todoapp
\dt -> look inside the database

SELECT * FROM "Todo"; -> example query