#!/usr/bin/env bash
set -eu
set -o pipefail

main() {
    go get -v -d

    GOOS=darwin GOARCH=amd64 go build -o build/api http/app.go
}

main "$@"