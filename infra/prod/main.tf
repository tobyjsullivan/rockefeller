terraform {
  backend "s3" {
    bucket = "terraform-states.tobyjsullivan.com"
    key    = "states/rockefeller/production.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = "us-east-1"
}

module "env" {
  source = "../common"
  env    = "production"
}

output "api_invoke_url" {
  value = "${module.env.api_invoke_url}"
}

output "s3_data_region" {
  value = "${module.env.s3_data_region}"
}

output "s3_data_bucket" {
  value = "${module.env.s3_data_bucket}"
}

output "s3_data_key" {
  value = "${module.env.s3_data_key}"
}

output "web_s3_bucket" {
  value = "${module.env.web_s3_bucket}"
}

output "web_s3_bucket_endpoint" {
  value = "${module.env.web_s3_bucket_endpoint}"
}