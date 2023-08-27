
output "base_url" {
  value = "${aws_api_gateway_deployment.cap6635.invoke_url}"
}

resource "aws_api_gateway_rest_api" "cap6635" {
  name        = "cap6635"
  description = "API to call CAP6635 AI algorithms"

  body = jsonencode({
    openapi = "3.0.1"
    info = {
      title   = "cap6635"
      version = "1.0"
    }
    paths = {
      "/reflex" = {
        post = {
          x-amazon-apigateway-integration = {
            credentials          = "${aws_iam_role.main.arn}"
            httpMethod           = "POST"
            payloadFormatVersion = "1.0"
            type                 = "AWS_PROXY"
            uri                  = "${aws_lambda_function.reflexvacuum.invoke_arn}"
          }
        }
      }
    }
  })
}

resource "aws_api_gateway_deployment" "cap6635" {
  rest_api_id = "${aws_api_gateway_rest_api.cap6635.id}"

  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_rest_api.cap6635.body
    ]))
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "cap6635" {
  deployment_id = aws_api_gateway_deployment.cap6635.id
  rest_api_id   = aws_api_gateway_rest_api.cap6635.id
  stage_name    = "cap6635"

  depends_on = [
    aws_cloudwatch_log_group.cap6635
  ]
}

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

resource "aws_cloudwatch_log_group" "cap6635" {
  name              = "API-Gateway-Execution-Logs_${aws_api_gateway_rest_api.cap6635.id}/cap6635"
  retention_in_days = 7
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

resource "aws_api_gateway_account" "main" {
  cloudwatch_role_arn = aws_iam_role.main.arn
}

resource "aws_iam_role" "main" {
  name = "api-gateway-logs-role"

  assume_role_policy = data.aws_iam_policy_document.assume_role_api.json
}

resource "aws_iam_role_policy_attachment" "api_main" {
  role       = aws_iam_role.main.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs"
}
