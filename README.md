# Migrating your project

## Installation

`npm install migs`

## Setting up your project

- Add a `config.json` file with your project specific config in it.
- Create a `migrations` folder to house migration files.
- Profit!

## Running Migrations

### Up
`migs migrate --direction up --env development --run`

### Down
`migs migrate --direction down --env development --run`

### To a specific migration
`migs migrate --direction up --env development --to yourmom --run`

### Generating migration files
`migs generate --name eat_some_tacos`

## Development

If you're developing new shiny things for mig, you'll need to run `npm run watch` before running stuff like `node dist/index.js migrate`

## Gotchas

If your umzug.json file in specific migrations repo has entries in the json array ... and you've wiped your db ... clearout the array ... should be []
