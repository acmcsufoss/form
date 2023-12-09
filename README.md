# form

A platform managing authenticated Discord form submissions within Discord
servers.

<!-- ## Architecture

[Insert architecture diagram here.] -->

## Development

### Installing project dependencies

Install the LTS version of [Node.js](https://nodejs.org/en/) for your operating
system.

To install project dependencies or apply changes made to the `package.json`
file, use the following command:

```sh
npm i
```

### Running the project

To run the project, use the following command:

```sh
npm run dev
```

### Pre-commit suggestions

Before committing, run the following commands:

- Run `npm run lint` to check for linting errors with ESLint ([config](.eslintrc.cjs))
- Run `npm run format` to format the code with Prettier ([config](.prettierrc))
- Run `npm run check` to check for Svelte Check errors.
- Run `npm run build` to make sure the project builds successfully.

Alternatively, run `npm run all` to run all of the above commands.

---

Maintained with ❤️ by [**@acmcsufoss**](https://oss.acmcsuf.com/)
