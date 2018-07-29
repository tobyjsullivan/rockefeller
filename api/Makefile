.PHONY: init serve package local docker/build-base docker/build-lambda docker/build-local format clean

init: docker/build-base

serve: target/local/http
	docker build --file Dockerfile.serve-http -t serve-http .
	docker run --tty --interactive --publish "8080:3000" \
		--env AWS_REGION="$$(cd ../infra/staging && terraform output s3_data_region)" \
		--env DATA_BUCKET="$$(cd ../infra/staging && terraform output s3_data_bucket)" \
		--env DATA_KEY="$$(cd ../infra/staging && terraform output s3_data_key)" \
		serve-http

package: target/lambda/package.zip

local: docker/build-local

target/lambda/package.zip: docker/build-lambda

dep:
	docker build --file build/Dockerfile.dep -t dep .
	docker run --tty --interactive --mount type=bind,source="$$(pwd)/src",target=/go/src/localhost/rockefeller/api dep

docker/build-base:
	docker build --file build/Dockerfile.build-base -t build-base .

docker/build-lambda: docker/build-base
	docker build --file build/Dockerfile.build-lambda -t build-lambda .
	docker rm build-lambda-container || true
	docker run --tty --interactive --name build-lambda-container build-lambda
	mkdir -p ./target/lambda
	docker cp build-lambda-container:/var/tmp/build/build/package.zip ./target/lambda
	docker rm build-lambda-container

docker/build-local: docker/build-base
	docker build --file build/Dockerfile.build-http -t build-http .
	docker rm build-http-container || true
	docker run --tty --interactive --name build-http-container build-http
	mkdir -p ./target/local
	docker cp build-http-container:/var/tmp/build/target/http ./target/local
	docker rm build-http-container

format:
	gofmt -w **/*.go

clean:
	rm -rf target
