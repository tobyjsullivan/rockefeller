variable "env" {}

module "api" {
  source         = "../../api/infra"
  lambda_package = "../../api/build/package.zip"
  env            = "${var.env}"
}

module "web" {
  source = "../../web/infra"
}

output "api_invoke_url" {
  value = "${module.api.api_invoke_url}"
}

output "s3_data_region" {
  value = "${module.api.s3_data_region}"
}

output "s3_data_bucket" {
  value = "${module.api.s3_data_bucket}"
}

output "s3_data_key" {
  value = "${module.api.s3_data_key}"
}

output "web_s3_bucket" {
  value = "${module.web.s3_bucket}"
}

output "web_s3_bucket_endpoint" {
  value = "${module.web.s3_bucket_endpoint}"
}