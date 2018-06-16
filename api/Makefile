.PHONY: build package format clean

build/lambda_handler: *.go */**.go
	GOOS=linux GOARCH=amd64 go build -o build/lambda_handler lambda_handler.go

build: build/lambda_handler

build/package.zip: build/lambda_handler
	zip -j build/package.zip build/lambda_handler

package: build/package.zip

format:
	gofmt -w *.go

clean:
	rm -rf build
