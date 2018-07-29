.PHONY: init serve package test docker/build-base docker/build-lambda docker/build-local docker/test format clean

init: docker/build-base

serve: build/api
	export AWS_REGION="$$(cd ../infra/staging && terraform output s3_data_region)" && \
		export DATA_BUCKET="$$(cd ../infra/staging && terraform output s3_data_bucket)" && \
		export DATA_KEY="$$(cd ../infra/staging && terraform output s3_data_key)" && \
		build/api

package: build/package.zip

test: docker/test

build/api: docker/build-local

build/package.zip: docker/build-lambda

docker/build-base:
	docker build --file Dockerfile.build-base -t build-base .

docker/build-lambda:
	docker build --file Dockerfile.build-lambda -t build-lambda .
	docker rm build-lambda-container || true
	docker run -it --name build-lambda-container build-lambda
	mkdir -p ./build
	docker cp build-lambda-container:/var/tmp/build/build/package.zip ./build/

docker/build-local:
	docker build --file Dockerfile.build-local -t build-local .
	docker rm build-local-container || true
	docker run -it --name build-local-container build-local
	mkdir -p ./build
	docker cp build-local-container:/var/tmp/build/build/api ./build/

docker/test:
	docker build --file Dockerfile.test -t test .
	docker run -it test

format:
	gofmt -w **/*.go

clean:
	rm -rf build
