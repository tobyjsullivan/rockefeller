variable "s3_data_key" {
  default = "account1.data"
}

resource "aws_s3_bucket" "data" {
  bucket_prefix = "rockefeller-api"
  acl           = "private"
}

output "s3_data_region" {
  value = "${aws_s3_bucket.data.region}"
}

output "s3_data_bucket" {
  value = "${aws_s3_bucket.data.bucket}"
}

output "s3_data_key" {
  value = "${var.s3_data_key}"
}
