.PHONY: build serve package format clean

build/lambda_handler: *.go */**.go
	GOOS=linux GOARCH=amd64 go build -o build/lambda_handler lambda_handler.go

build: build/lambda_handler

build/package.zip: build/lambda_handler
	zip -j build/package.zip build/lambda_handler

serve:
	export AWS_REGION="$$(cd ../infra/staging && terraform output s3_data_region)" && \
		export DATA_BUCKET="$$(cd ../infra/staging && terraform output s3_data_bucket)" && \
		export DATA_KEY="$$(cd ../infra/staging && terraform output s3_data_key)" && \
		go run ./http/app.go

package: build/package.zip

format:
	gofmt -w *.go

clean:
	rm -rf build
