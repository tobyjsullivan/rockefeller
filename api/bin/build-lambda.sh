#!/usr/bin/env bash
set -eu
set -o pipefail

main() {
    go get -v -d ./src

    GOOS=linux GOARCH=amd64 go build -o build/lambda_handler src/lambda_handler.go

    zip -j build/package.zip build/lambda_handler
}

main "$@"