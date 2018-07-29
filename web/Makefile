.PHONY: clean build serve local storybook test

IDX=src/index.html

build/staging: clean/staging
	export GRAPH_API_URL="$$(cd ../infra/staging && terraform output api_invoke_url)/query" && \
		parcel build --out-dir dist/prod $(IDX)

build/prod: clean/prod
	export GRAPH_API_URL="$$(cd ../infra/prod && terraform output api_invoke_url)/query" && \
		parcel build --out-dir dist/staging $(IDX)

serve: clean/local
	export GRAPH_API_URL="$$(cd ../infra/staging && terraform output api_invoke_url)/query" && \
		parcel serve --out-dir dist/local $(IDX)

local: clean/local
	parcel serve --out-dir dist/local $(IDX)

test:
	yarn run test

storybook:
	npm run storybook

clean/cache:
	rm -rf .cache

clean/prod: clean/cache
	rm -rf dist/prod

clean/staging: clean/cache
	rm -rf dist/staging

clean/local: clean/cache
	rm -rf dist/local