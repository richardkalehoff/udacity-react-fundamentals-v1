This repo contains the project material for Udacity's React Fundamentals course, developed by React Training.

Projects are designed to showcase concepts that are important to using React. Each project has an API server that serves as a backend for the React app. This is designed to give students a hands-on experience dealing with how data flows from the server to the client in various real-world scenarios.

There is currently one "Address Book" project split across 2 directories:

  1. [`contacts`](contacts) - the Address Book client app
  2. [`contacts-api`](contacts-api) - the Address Book API (node app)

The Address Book project will be completed by students as they complete the course.

## Development

To start the project, first start the API server in the `contacts-api` directory using:

    $ yarn install
    $ yarn start

Then start the client app in the `contacts` directory using:

    $ yarn start

A browser window should open automatically with the app.

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
