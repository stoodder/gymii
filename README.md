# Gymii

Gymii is a simple calorie and strength tracker to help individuals reach their diet and weight lifting goals. Still a work in progress, the ultimate goal is to allow individuals to self-host their own health and wellness data on their local computers or home-server Bitcoin node in order to-obtain control of their personal health data.

## Local Development

- Install Node.js: `https://nodejs.org/en/download/`
- Install NVM: `https://github.com/nvm-sh/nvm#about`
- Switch environment to proper node version: `nvm install && nvm use`
- Install NPX: `npm install -g npx`
- Install Yarn: `npm install -g yarn`

### Environment Variable Setup Up

- Copy `sample.env` and create a new file with matches contents called `.env`


### Database Set Up

Gymii currently runs on a PostgreSQL server.

- Create a new database called `gymii` with a user called `admin` and a password of `admin`. Inside of your `.env` file set the `DATABASE_URL` config to `postgresql://admin:admin@localhost:5432/gymii` if it's not set already.

#### Prisma

Prisma is the currently used database schema and migration ORM selected for this project.

- Regenerate Client: `npx prisma generate`
- Seed Data: `npx prisma db seed`

In order to create future data migrations, run:

- Generate Migration `npx prisma migrate dev --name {name}`


### Starting the application

- Run: `yarn dev -o`


### Testing

- Run: `yarn test`

Server tests are located in `/server/tests`

## Architecture

WIP


## TODO:

- [ ] Utilize Docker to run app in order to deploy later to [Umbrel](https://umbrel.com/), [Embassy](https://start9.com/), etc.


Icons: https://icones.js.org/collection/ion?s=power
