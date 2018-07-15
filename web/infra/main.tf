resource "aws_s3_bucket" "web" {
  bucket_prefix = "rockefeller-web"
  acl    = "public-read"
  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_s3_bucket_policy" "web" {
  bucket = "${aws_s3_bucket.web.id}"
  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
              "s3:GetObject"
            ],
            "Resource": [
              "arn:aws:s3:::${aws_s3_bucket.web.bucket}/*"
            ]
        }
    ]
}
EOF
}

output "s3_bucket" {
  value = "${aws_s3_bucket.web.bucket}"
}

output "s3_bucket_endpoint" {
  value = "${aws_s3_bucket.web.bucket_domain_name}"
}
