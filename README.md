This repo contains the project material for Udacity's React Fundamentals course, developed by React Training.

Projects are designed to showcase concepts that are important to using React. Each project has an API server that serves as a backend for the React app. This is designed to give students a hands-on experience dealing with how data flows from the server to the client in various real-world scenarios.

There are currently 2 projects:

  1. [`contacts`](contacts) - to be completed by students during the course
  2. [`books`](books) - to be completed by students during the assessment

## Development

We use [yarn](https://yarnpkg.com/) in development, so install it first. If you already have [npm](https://www.npmjs.com/) installed, it's just:

    $ npm install -g yarn

To start a project, first start the API server in its corresponding "api" directory (e.g. `contacts-api` for the `contacts` app) using:

    $ yarn install
    $ yarn start

Then start the client app in its directory (e.g. `contacts`) using:

    $ yarn install
    $ yarn start

A browser window will open automatically with the app.

## Notes

These are just some of my personal notes that I'm using to organize my thoughts as I develop these projects.

The mind-blowing parts of React are:

- Ease of getting started
  - It's just JavaScript
  - Simple top-level API and DOM interop
- Ease of data management
  - It's explicit, easy to follow flow
  - You don't need a "model layer"
- Ease of state management
  - State is source of truth
  - State can be encapsulated in a component
- Cross-platform story
  - React Native
  - Server rendering

See also responses to https://twitter.com/mjackson/status/844963533712375816
