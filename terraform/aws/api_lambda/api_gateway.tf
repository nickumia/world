
output "base_url" {
  value = "${aws_api_gateway_deployment.cap6635.invoke_url}"
}

data "aws_route53_zone" "kamutiv" {
  name         = "kamutiv.com."
}

data "aws_acm_certificate" "cap6635" {
  domain      = "cap6635.kamutiv.com"
  types       = ["AMAZON_ISSUED"]
}

resource "aws_api_gateway_domain_name" "cap6635" {
  certificate_arn = data.aws_acm_certificate.cap6635.arn
  domain_name     = "cap6635.kamutiv.com"
}

resource "aws_route53_record" "cap6635" {
  name    = aws_api_gateway_domain_name.cap6635.domain_name
  type    = "A"
  zone_id = data.aws_route53_zone.kamutiv.id

  alias {
    evaluate_target_health = true
    name                   = aws_api_gateway_domain_name.cap6635.cloudfront_domain_name
    zone_id                = aws_api_gateway_domain_name.cap6635.cloudfront_zone_id
  }
}

resource "aws_api_gateway_rest_api" "cap6635" {
  name        = "cap6635"
  description = "API to call CAP6635 AI algorithms"
  disable_execute_api_endpoint = true

  body = jsonencode({
    openapi = "3.0.1"
    info = {
      title   = "cap6635"
      version = "1.0"
    }
    paths = {
      "/reflex" = {
        get = {
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

resource "aws_api_gateway_base_path_mapping" "cap6635" {
  api_id      = aws_api_gateway_rest_api.cap6635.id
  stage_name  = aws_api_gateway_stage.cap6635.stage_name
  domain_name = aws_api_gateway_domain_name.cap6635.domain_name
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
