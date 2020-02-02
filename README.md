# Recipe lover

Recipe lover is a blogging application used to store recipes.

## User Story

> As a user,
> I want a database of recipes,
> So that I can view and create recipes with like minded people.

## Instruction

### Installation

1. Create database. If you have the database, you can skip this step.

```sh
  npm run createdb
```

2. Migrate/ create tables

```sh
  npm run migrate
```

3. Add seeds

```sh
  npm run seed
```

4. Add css

```sh
  npm run generate:style
```
### Usage

```sh
  npm start
  # OR to run watch
  npm run dev

  # go to <hostname>:8080(e.g. localhost:8080) on your browser.
```

## Technology used

* Node.js
* Express.js
* Sequelize.js
* Bootstrap
* Bcrypt
* Passport.js
* Sass
* Handlebar
* Eslint
* Heroku
* jQuery

## Future Development

* Ingredient-based search
* Recipe-sharing
* Comments on recipes
* Mobile Applications
