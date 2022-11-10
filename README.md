# twentytwobot

A TwitchTV bot originally for the 22atreyu22 channel

* [First time setup][]
* [Startup][]

## First time setup
[First time setup]: #first-time-setup

After cloning the repository you need to set up environment variables. Copy the
sample `.env` file (`.env.sample`) to `.env`:

```sh
$ cp .env.sample .env
```

Replace the values with the proper values.

## Startup
[Startup]: #startup

To run the application you need [Docker][] and [docker-compose][]:

```sh
$ docker-compose up
```

For _PRODUCTION_:

```sh
$ caffeinate -i -d docker-compose up
```

The _Client_ layer can then be opened on [http://localhost:2222][].

---

[Docker]: https://www.docker.com/
[docker-compose]: https://docs.docker.com/compose/
[http://localhost:2222]: http://localhost:2222
