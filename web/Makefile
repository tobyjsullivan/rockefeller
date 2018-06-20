.PHONY: build serve

JS=$(*.js **/*.js)
TS=$(*.ts **/*.ts)
SRC=index.html $(JS) $(TS)

build: $(SRC)
	parcel build index.html
 
serve: $(SRC)
	parcel serve index.html

storybook:
	npm run storybook
