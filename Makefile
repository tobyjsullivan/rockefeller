.PHONY: api serve web staging/init staging/terraform staging/destroy staging/deploy

api:
	cd api && make package

web:
	cd web && make build

serve:
	cd web && make serve

staging/init:
	cd infra/staging && terraform init

staging/terraform:
	cd infra/staging && terraform apply

staging/deploy:
	cd api && make package
	cd infra/staging && terraform apply -auto-approve -target='module.staging_env.module.api.aws_lambda_function.handler'
	cd web && make build/staging
	aws s3 sync \
		--delete \
		--content-encoding 'utf-8' \
		--content-type 'application/json; charset=utf-8' \
		--exclude 'index.html' \
		./web/dist/ "s3://$$(cd infra/staging && terraform output web_s3_bucket)/"
	aws s3 cp --content-type 'text/html' \
		./web/dist/index.html "s3://$$(cd infra/staging && terraform output web_s3_bucket)/index.html"

staging/destroy:
	cd infra/staging && terraform destroy

prod/init:
	cd infra/prod && terraform init

prod/terraform:
	cd infra/prod && terraform apply

prod/deploy:
	cd api && make build
	cd infra/prod && terraform apply -target='module.env.module.api.aws_lambda_function.handler'
	cd web && make build/prod
	aws s3 sync \
		--content-encoding 'utf-8' \
		--content-type 'application/json; charset=utf-8' \
		--exclude 'index.html' \
		./web/dist/ "s3://$$(cd infra/prod && terraform output web_s3_bucket)/"
	aws s3 cp --content-type 'text/html' \
		./web/dist/index.html "s3://$$(cd infra/prod && terraform output web_s3_bucket)/index.html"
