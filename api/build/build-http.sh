#!/usr/bin/env bash
set -eu
set -o pipefail

main() {
    go get -v -d

    GOOS=linux GOARCH=amd64 go build -o target/http http/app.go
}

main "$@"