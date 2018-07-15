.PHONY: build serve storybook test

IDX=src/index.html

build:
	parcel build $(IDX)

serve:
	rm -rf .cache
	export GRAPH_API_URL="$$(cd ../infra/staging && terraform output api_invoke_url)/query" && \
	parcel serve $(IDX)

test:
	yarn run test

storybook:
	npm run storybook
