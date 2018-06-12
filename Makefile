.PHONY: api staging/init staging/deploy

api:
	cd api && make package

staging/init:
	cd infra/staging && terraform init

staging/deploy:
	cd infra/staging && terraform apply

staging/destroy:
	cd infra/staging && terraform destroy

