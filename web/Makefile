.PHONY: clean build serve local storybook test

IDX=src/index.html

build/staging: clean
	export GRAPH_API_URL="$$(cd ../infra/staging && terraform output api_invoke_url)/query" && \
		parcel build $(IDX)

build/prod: clean
	export GRAPH_API_URL="$$(cd ../infra/prod && terraform output api_invoke_url)/query" && \
		parcel build $(IDX)

serve: clean
	export GRAPH_API_URL="$$(cd ../infra/staging && terraform output api_invoke_url)/query" && \
		parcel serve $(IDX)

local: clean
	parcel serve $(IDX)

test:
	yarn run test

storybook:
	npm run storybook

clean:
	rm -rf dist .cache