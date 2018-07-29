#!/usr/bin/env bash
set -eu
set -o pipefail

main() {
    go get -v -d ./src

    GOOS=darwin GOARCH=amd64 go build -o build/api src/http/app.go
}

main "$@"