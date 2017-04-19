This repo contains the projects for Udacity's React Fundamentals course, developed by React Training.

Projects are designed to showcase concepts that are important to using React. Each project has an API server that serves as a backend for the React app. This is designed to give students a hands-on experience dealing with how data flows from the server to the client in various real-world scenarios.

There are currently 2 projects:

  1. [`contacts`](contacts) - to be completed by students during the course
  2. [`books`](books) - to be completed by students during the assessment

Additionally, there is a starter template for the assessment project in the [`books-starter`](books-starter) directory. This is a static HTML + CSS version of the final project that may serve as a starting point for students who don't want to write their own markup from scratch.

## Development

We use [yarn](https://yarnpkg.com/) in development, so install it first. If you already have [npm](https://www.npmjs.com/) installed, it's just:

    $ npm install -g yarn

To start a project, first start the API server in its corresponding "api" directory (e.g. `contacts-api` for the `contacts` app) using:

    $ yarn install
    $ yarn start

Note: The `books-api` server requires a `GOOGLE_BOOKS_API_KEY` environment variable in order to make requests to the Google Books API. You can either set this variable in your shell when you start the server or in [a `.env` file](https://github.com/motdotla/dotenv) in the `books-api` directory.

Then start the client app in its directory (e.g. `contacts`) using:

    $ yarn install
    $ yarn start

A browser window will open automatically with the app.
