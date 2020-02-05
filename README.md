# Recipe lover

Recipe lover is a blogging application used to store recipes.

## Project description 
This application stands as a site to view, search and create recipes. A user can create an account and utilise this application to house and favorite recipes. 
The vision for this site is to curate recipes from all over the world and be a space for like-minded individuals to use and share their culinary insights. This application was also built with mobile in mind and is responsive.


This application needed to adhere to the below restrictions: 

* Must have a folder structure that meets the MVC paradigm - [x]

* Must meet good-quality coding standards (indentation, scoping,  naming, etc.) - [x]

* Must have a polished front end/UI - [x]

* Must utilize at least one new library, package, or technology - [x]

* Must have both GET and POST routes for retrieving and adding new data - [x]

* Must be deployed using Heroku (with data) - [x]

* Must use a Node and Express web server - [x]

* Must be backed by a MySQL database with a Sequelize ORM - [x]

* Must protect API keys in Node with environment variables - [x]

Additionally:

* Utilize Handlebars for server-side templating - [x]

* Incorporate authentication - [x]

* Create a migration strategy for sharing data across team members - [x]

## Project Management
This project was managed by utilizing scrum practices. Tasks were broken down by features and assigned to team members. 
* Jobs progression was tracked on a Trello board.
* scrum stand-up ceremony was practiced when the team was physically present.

## User Story

> As a user,
> I want a database of recipes,
> So that I can view and create recipes with like minded people.


## Instructions to user

* [Recipe Lovers Site](https://hhop-recipe-blog.herokuapp.com)
* Login or sign up to create an account.
* Use the search bar to look for publicly available recipes.
* Click the heart icon on a recipe card to add it to your favorites list.
* Use view button to see the full recipe.
* Click "Create" to add your own recipe.
* Use Edit or delete delete buttons to modifiy or remove recipes you create.
* Use the "Publish Recipe" button to share your recipe with others! (note: this will make your recipe public)
* Click the "Home" icon to view a full list of recipes you have created or favorited.
* Click the settings icon to change you password.

## Installation on a local environment

1. Create database. If you have the database, you can skip this step.

```sh
  npm run db:build
```

2. Add css

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
* Include Prep / Cook time , Number of  Servings and Difficulty to Recipes.
* Include email verification
* Comments on recipes
* Mobile Applications

## Quality Assurance Tests:

### Responsiveness and CSS per browser
* Chrome browser - base line 

* Firefox browser
  * Responsiveness - Y
  * Does the UI change? - N
  * Any browser variations? - N
  * Expected and Actual behavior are the same? Y

* Edge
  * Responsiveness - Y
  * Does the UI change? - N
  * Any browser variations? - N
  * Expected and Actual behavior are the same? Y

* Safari browser
  * Responsiveness - Y
  * Does the UI change? - N
  * Any browser variations? - N
  * Expected and Actual behavior are the same? N

* Android mobile Chrome
  * Responsiveness - Y
  * Does the UI change? - N
  * Any browser variations? - N
  * Expected and Actual behavior are the same? Y

* Apple mobile browser
  * Responsiveness - Y/N
  * Does the UI change? - Y/N
  * Any browser variations? - Y/N
  * Expected and Actual behavior are the same? Y/N

## Code test:
Coding standard were maintained by Travis CI and Eslint.

## Limitations:
* As the application does not; st this stage have email verification, a user can create an account with a fake email address.

## Developers
* Cynthia
* Harper
* Devin
* Tara 

## Acknowledgments
Monash coding Bootcamp academic staff
