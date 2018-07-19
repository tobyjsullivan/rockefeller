# Rockefeller GraphQL API

## Building

The build tooling for the API is primarily Docker-base with
a `Makefile` doing most of the legwork.

```sh
# Build the base build image. Can take a few minutes.
make init

# Build and run the local version of the API (mac OS).
make server

# Build the Lambda-deployable version of the API.
make package
```