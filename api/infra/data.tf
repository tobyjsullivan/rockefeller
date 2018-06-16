resource "aws_s3_bucket" "data" {
  bucket_prefix = "rockefeller-api"
  acl           = "private"
}
