# books-api

# local dev

build the docker image:

```sh
docker-compose build
```

then jump into a container via docker-compose and re-install the npm
modules with yarn (docker-compose is sharing the volume, this way you'll
have them locally)

```sh
docker-compose run --rm web yarn install
```

add a `docker-compose.override.yml` file and enter your `GOOGLE_BOOKS_API_KEY`
as an env var (this file is gitignored).


then `docker-compose up` to run the server
