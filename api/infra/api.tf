variable "lambda_package" {}
variable "env" {}

// Some changes require a stage redeployment. That can be invoked by updating this version.
variable "api_schema_version" {
  default = "1"
}

provider "random" {}

resource "random_id" "handler_id" {
  byte_length = 8
}

resource "aws_iam_role" "lambda_role" {
  name_prefix = "graph-api"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "lambda_logs" {
  name_prefix = "graph-api-logging"
  role        = "${aws_iam_role.lambda_role.id}"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:DescribeLogGroups",
        "logs:DescribeLogStreams",
        "logs:PutLogEvents",
        "logs:GetLogEvents",
        "logs:FilterLogEvents"
      ],
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "data_bucket" {
  name_prefix = "graph-api-data"
  role        = "${aws_iam_role.lambda_role.id}"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Effect": "Allow",
      "Resource": "${aws_s3_bucket.data.arn}/*"
    }
  ]
}
EOF
}

resource "aws_lambda_function" "handler" {
  filename         = "${var.lambda_package}"
  source_code_hash = "${base64sha256(file(var.lambda_package))}"
  function_name    = "graph-api-${random_id.handler_id.hex}"
  handler          = "lambda_handler"
  runtime          = "go1.x"
  role             = "${aws_iam_role.lambda_role.arn}"

  environment {
    variables {
      "DATA_BUCKET" = "${aws_s3_bucket.data.bucket}"
      "DATA_KEY"    = "${var.s3_data_key}"
    }
  }
}

resource "aws_api_gateway_rest_api" "api" {
  depends_on = ["aws_lambda_function.handler"]
  name       = "graph-api-${random_id.handler_id.hex}"
}

resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  parent_id   = "${aws_api_gateway_rest_api.api.root_resource_id}"
  path_part   = "query"
}

resource "aws_api_gateway_method" "proxy" {
  rest_api_id   = "${aws_api_gateway_rest_api.api.id}"
  resource_id   = "${aws_api_gateway_resource.proxy.id}"
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  resource_id = "${aws_api_gateway_method.proxy.resource_id}"
  http_method = "${aws_api_gateway_method.proxy.http_method}"

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.handler.invoke_arn}"
}

resource "aws_api_gateway_method" "proxy_options" {
  rest_api_id   = "${aws_api_gateway_rest_api.api.id}"
  resource_id   = "${aws_api_gateway_resource.proxy.id}"
  http_method   = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda_options" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  resource_id = "${aws_api_gateway_method.proxy_options.resource_id}"
  http_method = "${aws_api_gateway_method.proxy_options.http_method}"

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.handler.invoke_arn}"
}

resource "aws_api_gateway_deployment" "api_deployment" {
  depends_on = ["aws_api_gateway_integration.lambda", "aws_api_gateway_integration.lambda_options"]

  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  stage_name  = "${var.env}"

  variables {
    api_version = "${var.api_schema_version}"
  }
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.handler.arn}"
  principal     = "apigateway.amazonaws.com"

  # The /*/* portion grants access from any method on any resource
  # within the API Gateway "REST API".
  source_arn = "${aws_api_gateway_deployment.api_deployment.execution_arn}/*/*"
}

resource "aws_api_gateway_method_settings" "api_settings" {
  depends_on = [
    "aws_api_gateway_account.account",
    "aws_api_gateway_deployment.api_deployment",
  ]

  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  stage_name  = "${var.env}"
  method_path = "*/*"

  settings {
    metrics_enabled = true
    logging_level   = "INFO"
  }
}

resource "aws_api_gateway_account" "account" {
  cloudwatch_role_arn = "${aws_iam_role.cloudwatch.arn}"
}

resource "aws_iam_role" "cloudwatch" {
  name_prefix = "api_gateway_cloudwatch_global"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "apigateway.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "cloudwatch" {
  role = "${aws_iam_role.cloudwatch.id}"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:DescribeLogGroups",
        "logs:DescribeLogStreams",
        "logs:PutLogEvents",
        "logs:GetLogEvents",
        "logs:FilterLogEvents"
      ],
      "Resource": "*"
    }
  ]
}
EOF
}

output "api_invoke_url" {
  value = "${aws_api_gateway_deployment.api_deployment.invoke_url}"
}
