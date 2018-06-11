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
  source         = "../common"
  env            = "staging"
}

output "api_invoke_url" {
  value = "${module.staging_env.api_invoke_url}"
}

