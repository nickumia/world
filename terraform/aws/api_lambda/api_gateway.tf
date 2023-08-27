
resource "aws_api_gateway_rest_api" "cap6635" {
  name                         = "cap6635"
  description                  = "API to call CAP6635 AI algorithms"
  disable_execute_api_endpoint = true
}

resource "aws_api_gateway_account" "main" {
  cloudwatch_role_arn = aws_iam_role.main.arn
}

resource "aws_api_gateway_deployment" "cap6635" {
  rest_api_id = aws_api_gateway_rest_api.cap6635.id

  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.reflex,
      aws_api_gateway_method.reflex,
      aws_api_gateway_integration.reflex
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

resource "aws_api_gateway_method_settings" "all" {
  rest_api_id = aws_api_gateway_rest_api.cap6635.id
  stage_name  = aws_api_gateway_stage.cap6635.stage_name
  method_path = "*/*"

  settings {
    metrics_enabled        = true
    logging_level          = "INFO"
    throttling_burst_limit = 5000
    throttling_rate_limit  = 10000
  }
}

resource "aws_cloudwatch_log_group" "cap6635" {
  name              = "API-Gateway-Execution-Logs_${aws_api_gateway_rest_api.cap6635.id}/cap6635"
  retention_in_days = 7
}
