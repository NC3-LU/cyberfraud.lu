# Repository of [cyberfraud.lu](https://cyberfraud.lu)

Technology stack:

- [Next.js](https://nextjs.org)
- [BiomeJs](https://biomejs.dev/) for formatting and linting.
- [TailwindCss](https://tailwindcss.com/)
- [react-icons](https://react-icons.github.io/react-icons/)

The website gets the content from the json files present in the _data folder (EN, LU, DE, FR).

## Development

### Getting Started

Be sure to have the following software in your machine:

- `Node.js` >= 22
- `pnpm` >= 10 (if you want to use `pnpm`)

Then:

- Clone the project
- run `pnpm install`
- run `pnpm dev `
- open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Linting, formatting, checking types

There are 4 commands you can run, in order to:

### Linting

Runs various checks on the file

```bash
pnpm lint
```

### Formatting

Run the formatter

```bash
pnpm format
```

### Format, Lint and Fix together

Runs formatter, linter and import sorting to the requested files.

```bash
pnpm check
```

### Type checking with Typescript

```bash
pnpm typecheck
```

You can start editing the page by modifying `app/local/page.tsx`. The page auto-updates as you edit the file.

## Docker Local Deployment

To create the docker images (check `docker` folder for further info) run the following command:

```bash
make build-development
```

To run the docker stack (previously built):

```bash
make start-development
```

> The described commands are present in the `Makefile` script

## Docker Deployment

Once you created the image (with `build-development` or `build-production`) you can run it in any machine with docker
installed.

1. Create a folder. Example: `mkdir cyberfraud-lu-website && cd cyberfraud-lu-website`.

2. Copy the content of _data in a specific folder folder: `mkdir data && cp _data/*.json ./data`

3. Create a `.env` file with the following variables:
    ```dotenv
    COMPOSE_PROJECT_NAME=cyberfraud-lu
    # The one that you created with build-development or build-production 
    IMAGE_NAME=[image name]
    # The port that is exposed to the host
    EXPOSED_PORT=3034
    # Translations folders (important, all the translations should be there before starting the container)
    DATA_FOLDER=../../_data
    ```

- Create a `docker-compose.yml` file:
    ```yaml
    services:
      cyberfraud_lu_web:
        image: ${IMAGE_NAME}
        env_file:
          - .env
        ports:
          - "${EXPOSED_PORT}:3000"
          -
        volumes:
          - ${DATA_FOLDER}:/app/_data
    ```

- Run `docker compose up -d` and go to `localhost:[EXPOSED_PORT]`

> Check the [docker/example](docker/example)


