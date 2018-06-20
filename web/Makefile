.PHONY: build serve

IDX=src/index.html
JS=$(src/**/*.js)
TS=$(src/**/*.ts)
SRC=$(IDX) $(JS) $(TS)

build: $(SRC)
	parcel build $(IDX)
 
serve: $(SRC)
	parcel serve $(IDX)

storybook:
	npm run storybook
