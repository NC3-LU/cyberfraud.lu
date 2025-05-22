This is a [Next.js](https://nextjs.org) project starting point with:
- [TypeScript](https://www.typescriptlang.org/)
- [BiomeJs](https://biomejs.dev/) for formatting and linting.
- [TailwindCss](https://tailwindcss.com/)
- [react-icons](https://react-icons.github.io/react-icons/)

The project can be easily deployed with Docker or run locally.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Linting, formatting, checking types
There are 4 commands you can run, in order to:

### Linting
Runs various checks on the file
```bash
npm run lint
# or
yarn lint
# or
pnpm lint
# or
bun lint
```

### Formatting
Run the formatter
```bash
npm run format
# or
yarn format
# or
pnpm format
# or
bun format
```

### Format, Lint and Fix together
Runs formatter, linter and import sorting to the requested files.

```bash
npm run check
# or
yarn check
# or
pnpm check
# or
bun check
```

### Type checking with Typescript
```bash
npm run typecheck
# or
yarn typecheck
# or
pnpm typecheck
# or
bun typecheck
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Docker Deployment
To create the docker images (check `docker` folder for further info) run the following command:
```bash
make build-development
# or
make build-production
```

To run the docker stack (previously built):
```bash
make start-development
# or
make start-production
```

> The described commands are present in the `Makefile` script

> Please make sure that `.env.development` or `.env.production` exists on the root folder.

## Learn more
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

