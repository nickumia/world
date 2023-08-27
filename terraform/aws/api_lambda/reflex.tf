
resource "aws_lambda_function" "reflexvacuum" {
  function_name = "ReflexVacuum"

  s3_bucket = "offline.kamutiv.com"
  s3_key    = "reflexvacuum.zip"

  handler = "main.handler"
  runtime = "python3.10"

  role = aws_iam_role.main.arn
}

resource "aws_api_gateway_resource" "reflex" {
  rest_api_id = aws_api_gateway_rest_api.cap6635.id
  parent_id   = aws_api_gateway_rest_api.cap6635.root_resource_id
  path_part   = "reflex"
}

resource "aws_api_gateway_method" "reflex" {
  rest_api_id          = aws_api_gateway_rest_api.cap6635.id
  resource_id          = aws_api_gateway_resource.reflex.id
  http_method          = "GET"
  authorization        = "COGNITO_USER_POOLS"
  authorizer_id        = aws_api_gateway_authorizer.authorizer.id
  api_key_required     = false
  authorization_scopes = aws_cognito_resource_server.resource_server.scope_identifiers
}

resource "aws_api_gateway_integration" "reflex" {
  rest_api_id             = aws_api_gateway_rest_api.cap6635.id
  resource_id             = aws_api_gateway_resource.reflex.id
  http_method             = aws_api_gateway_method.reflex.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.reflexvacuum.invoke_arn
}
