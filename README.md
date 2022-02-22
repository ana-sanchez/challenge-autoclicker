
## Challenge autoclicker

Progressive Web App created with @open-wc and lit-element.
You can test it: <https://challenge-autoclicker.web.app/>

## Quickstart

To get started:

For start coding in the local dev environment, there are some dependencies to install before:

- NodeJs
- Firebase CLI
- Visual Studio Code

```bash
npm install
# requires node 10 & npm 6 or higher
```

Start a local dev server with:

```npm run start```

## Scripts

- `start` runs your app for development, reloading on file changes
- `start:build` runs your app after it has been built using the build command
- `build` builds your app and outputs it in your `dist` directory
- `test` runs your test suite with Web Test Runner
- `lint` runs the linter for your project
- `format` fixes linting and formatting errors

**How to deploy**

- To list all the Firebase projects to which you have access, run:

```firebase projects:list```

- Set current firebase project firebase:

```firebase use [proyect]```

- To deploy in dev:

```npm run deploy-dev```

**Happy coding!**
