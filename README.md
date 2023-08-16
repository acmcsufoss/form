# form

A platform managing authenticated Discord form submissions within the server
through automated links.

## Development

Run the development server with [`deno`](https://deno.land/x/install). This
command will install the required dependencies and start the development server.

```sh
deno task start
```

### Environment variables

- `JWT_SECRET`: Secret used to sign and verify JSON Web Tokens.
- `SERVER_URL`: URL of the server.
- `DISCORD_CLIENT_ID`: Discord client ID for
  [OAuth2 authentication](https://discord.com/developers/docs/topics/oauth2).
- `DISCORD_CLIENT_SECRET`: Discord client secret for
  [OAuth2 authentication](https://discord.com/developers/docs/topics/oauth2).

### Style guide

#### Formatting

This project uses Deno's default
[formatting](https://deno.land/manual/tools/formatter). Pull requests are
checked via GitHub workflow to ensure that the code is formatted correctly. To
ensure that code is formatted correctly, run the following command:

```sh
deno fmt
```

#### Linting

This project uses Deno's default
[linting options](https://deno.land/manual/tools/linter). Pull requests are
checked via GitHub workflow to ensure that the code is linted correctly. To
ensure that code is linted correctly, run the following command:

```sh
deno lint
```

---

Maintained with ❤️ by [**@acmcsufoss**](https://oss.acmcsuf.com/)
