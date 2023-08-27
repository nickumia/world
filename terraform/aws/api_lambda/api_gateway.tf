
output "base_url" {
  value = aws_api_gateway_deployment.cap6635.invoke_url
}

resource "aws_api_gateway_rest_api" "cap6635" {
  name                         = "cap6635"
  description                  = "API to call CAP6635 AI algorithms"
  disable_execute_api_endpoint = true
}

resource "aws_api_gateway_deployment" "cap6635" {
  rest_api_id = aws_api_gateway_rest_api.cap6635.id

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

resource "aws_cloudwatch_log_group" "cap6635" {
  name              = "API-Gateway-Execution-Logs_${aws_api_gateway_rest_api.cap6635.id}/cap6635"
  retention_in_days = 7
}

resource "aws_api_gateway_account" "main" {
  cloudwatch_role_arn = aws_iam_role.main.arn
}

resource "aws_cognito_resource_server" "resource_server" {
  name         = "cap6635_auth_server"
  identifier   = "https://${aws_route53_record.cap6635.fqdn}"
  user_pool_id = "${aws_cognito_user_pool.cap6635.id}"

  scope {
    scope_name        = "all"
    scope_description = "Get access to all API Gateway endpoints."
  }
}

resource "aws_api_gateway_resource" "reflex" {
  rest_api_id = "${aws_api_gateway_rest_api.cap6635.id}"
  parent_id   = "${aws_api_gateway_rest_api.cap6635.root_resource_id}"
  path_part   = "reflex"
}

resource "aws_api_gateway_authorizer" "authorizer" {
  name          = "cap6635"
  type          = "COGNITO_USER_POOLS"
  rest_api_id   = "${aws_api_gateway_rest_api.cap6635.id}"
  provider_arns = [aws_cognito_user_pool.cap6635.arn]

}

resource "aws_api_gateway_method" "reflex" {
  rest_api_id          = "${aws_api_gateway_rest_api.cap6635.id}"
  resource_id          = "${aws_api_gateway_resource.reflex.id}"
  http_method          = "GET"
  authorization        = "COGNITO_USER_POOLS"
  authorizer_id        = "${aws_api_gateway_authorizer.authorizer.id}"
  api_key_required     = true
  authorization_scopes = aws_cognito_resource_server.resource_server.scope_identifiers
}

resource "aws_api_gateway_integration" "reflex" {
  rest_api_id             = "${aws_api_gateway_rest_api.cap6635.id}"
  resource_id             = "${aws_api_gateway_resource.reflex.id}"
  http_method             = "${aws_api_gateway_method.reflex.http_method}"
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.reflexvacuum.invoke_arn
}

resource "aws_cognito_user_pool" "cap6635" {
  name = "cap6635"
  admin_create_user_config {
    allow_admin_create_user_only = true
  }
}

resource "aws_cognito_user_pool_client" "cap6635" {
  name = "client"

  user_pool_id = aws_cognito_user_pool.cap6635.id
}
