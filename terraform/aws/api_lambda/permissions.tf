
resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.reflexvacuum.function_name}"
  principal     = "apigateway.amazonaws.com"

  # The /*/*/* portion grants access from any method on any resource
  # within the API Gateway "REST API".
  source_arn = "${aws_api_gateway_rest_api.cap6635.execution_arn}/*/*/*"
}

resource "aws_lambda_permission" "logging" {
  statement_id  = "AllowCloudwatchInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.reflexvacuum.function_name}"
  principal     = "logs.amazonaws.com"
  source_arn    = "${aws_cloudwatch_log_group.cap6635.arn}:*"
}

data "aws_iam_policy_document" "assume_role_api" {
  statement {
    effect = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["apigateway.amazonaws.com"]
    }
  }

  # IAM role which dictates what other AWS services the Lambda function
  # may access.
  statement {
    effect = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "main" {
  name = "api-gateway-logs-role"

  assume_role_policy = data.aws_iam_policy_document.assume_role_api.json
}

resource "aws_iam_role_policy_attachment" "api_main" {
  role       = aws_iam_role.main.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs"
}
