## labset

### overview

Labset or Canopy is our $0 budget corner for building software using available cloud providers,
it is our escape from the potential monotony of life, and a safe space to remember how
joyful writing code is even when builds are failing and shit's on fire ... break it til you make it.

We are setting a few constraints :

- we operate on a $0 budget, so free tier all the way
  - build minutes are precious (yes GitHub has a limit) so we rely on Git hooks for detecting lint and compile errors
- one runtime per mono-repo (as opposed to one programming language)
  - one build tool per repo please
  - use docker to orchestrate other runtimes when needed
- we like types, please use them.
  - bash scripts are fine, but opt for a higher level language

This is the Node/TypeScript mono-repo 🎉 ... if you see me write Java here, feel free to tell me to GTFO

Cheers

### development setup

- install and build

```bash
yarn
yarn build
```

- start local harness

```bash
yarn workspace @labset-harness/local server:dev
yarn workspace @labset-local/harness client:dev
```

### aws development setup

- get access to aws console
- install [aws-vault](https://github.com/99designs/aws-vault)
- configure with generated access key ID and Secret

```bash
aws-vault add <name>
```

- execute command

```bash
aws-vault exec <name> -- aws s3 ls
```

- open a browser window and login to aws console

```bash
aws-vault login <name>
```
