variable "env" {}

module "api" {
  source         = "../../api/infra"
  lambda_package = "../../api/build/package.zip"
  env            = "${var.env}"
}

output "api_invoke_url" {
  value = "${module.api.api_invoke_url}"
}
