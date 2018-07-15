terraform {
  backend "s3" {
    bucket = "terraform-states.tobyjsullivan.com"
    key    = "states/rockefeller/staging.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = "us-east-1"
}

module "staging_env" {
  source = "../common"
  env    = "staging"
}

output "api_invoke_url" {
  value = "${module.staging_env.api_invoke_url}"
}

output "s3_data_region" {
  value = "${module.staging_env.s3_data_region}"
}

output "s3_data_bucket" {
  value = "${module.staging_env.s3_data_bucket}"
}

output "s3_data_key" {
  value = "${module.staging_env.s3_data_key}"
}

output "web_s3_bucket" {
  value = "${module.staging_env.web_s3_bucket}"
}

output "web_s3_bucket_endpoint" {
  value = "${module.staging_env.web_s3_bucket_endpoint}"
}