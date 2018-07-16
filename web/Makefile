.PHONY: clean build serve storybook test deploy/staging

IDX=src/index.html

build: clean
	export GRAPH_API_URL="$$(cd ../infra/staging && terraform output api_invoke_url)/query" && \
		parcel build $(IDX)

serve: clean
	export GRAPH_API_URL="$$(cd ../infra/staging && terraform output api_invoke_url)/query" && \
		parcel serve $(IDX)

local: clean
	parcel serve $(IDX)

deploy/staging: build
	aws s3 sync \
		--delete \
		--content-encoding 'utf-8' \
		--content-type 'application/json; charset=utf-8' \
		--exclude 'index.html' \
		./dist/ "s3://$$(cd ../infra/staging && terraform output web_s3_bucket)/"
	aws s3 cp --content-type 'text/html' \
		./dist/index.html "s3://$$(cd ../infra/staging && terraform output web_s3_bucket)/index.html"

test:
	yarn run test

storybook:
	npm run storybook

clean:
	rm -rf dist .cache