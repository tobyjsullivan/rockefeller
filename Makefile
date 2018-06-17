.PHONY: api staging/init staging/deploy

api:
	cd api && make package

staging/init:
	cd infra/staging && terraform init

staging/deploy:
	cd infra/staging && terraform apply -auto-approve -target='module.staging_env.module.api.aws_lambda_function.handler'

staging/terraform:
	cd infra/staging && terraform apply

staging/destroy:
	cd infra/staging && terraform destroy

