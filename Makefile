.PHONY: api serve web staging/init staging/terraform staging/destroy staging/deploy

api:
	cd api && make package

web:
	cd web && make build

serve:
	cd web && make serve

staging/init:
	cd infra/staging && terraform init

staging/deploy:
	cd infra/staging && terraform apply -auto-approve -target='module.staging_env.module.api.aws_lambda_function.handler'
	cd web && make deploy/staging

staging/terraform:
	cd infra/staging && terraform apply

staging/destroy:
	cd infra/staging && terraform destroy

