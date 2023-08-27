
# Connect API-Lambda for /reflex
resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.reflexvacuum.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn = "${aws_api_gateway_rest_api.cap6635.execution_arn}/*/GET/reflex"
}

# Give lambda permission to cloudwatch
resource "aws_lambda_permission" "logging" {
  statement_id  = "AllowCloudwatchInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.reflexvacuum.function_name
  principal     = "logs.amazonaws.com"
  source_arn    = "${aws_cloudwatch_log_group.cap6635.arn}:*"
}

###############################################################################
# Create IAM Role with permissions to all features

resource "aws_iam_role" "main" {
  name = "api-gateway-role"
  assume_role_policy = data.aws_iam_policy_document.assume_role_api.json
}

resource "aws_iam_role_policy_attachment" "api_logs" {
  role       = aws_iam_role.main.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs"
}

resource "aws_iam_role_policy_attachment" "api_lambda" {
  role       = aws_iam_role.main.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaRole"
}

data "aws_iam_policy_document" "assume_role_api" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["apigateway.amazonaws.com"]
    }
  }

  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}
