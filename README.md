# Recipe lover

Recipe lover is a blogging application used to store recipes.

## Project description 
This application will display restaurants with known low ratings. The user can save time and money by using the application api database to make an educated decision on where NOT to eat. This application was also built with mobile in mind and is responsive.


Additionally, this application needed to adhere to the below restrictions: 

* Must have a folder structure that meets the MVC paradigm - [x]

* Must meet good-quality coding standards (indentation, scoping,  naming, etc.) - [x]

* Must have a polished front end/UI - [x]

* Must utilize at least one new library, package, or technology - [x]

* Must have both GET and POST routes for retrieving and adding new data - [x]

* Must be deployed using Heroku (with data) - [x]

* Must use a Node and Express web server - [x]

* Must be backed by a MySQL database with a Sequelize ORM - [x]

* Must protect API keys in Node with environment variables - [x]


#### Project Management
This project was managed by utilizing scrum practices. Tasks were broken down by features and assigned to team members. 
* Jobs progression was tracked on a Trello board.
* scrum stand-up ceremony was practiced when the team was physically present.

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
