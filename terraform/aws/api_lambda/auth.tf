
output "cognito_url" {
  value = aws_cognito_user_pool_domain.cap6635.domain
}

resource "aws_cognito_resource_server" "resource_server" {
  name         = "cap6635_auth_server"
  identifier   = "https://${aws_route53_record.api.fqdn}"
  user_pool_id = aws_cognito_user_pool.cap6635.id

  scope {
    scope_name        = "all"
    scope_description = "Get access to all API Gateway endpoints."
  }
}

resource "aws_api_gateway_authorizer" "authorizer" {
  name          = "cap6635"
  type          = "COGNITO_USER_POOLS"
  rest_api_id   = aws_api_gateway_rest_api.cap6635.id
  provider_arns = [aws_cognito_user_pool.cap6635.arn]

}

resource "aws_cognito_user_pool" "cap6635" {
  name = "cap6635"
  admin_create_user_config {
    allow_admin_create_user_only = true
  }
}

resource "aws_cognito_user_pool_client" "cap6635" {
  name                                 = "client"
  user_pool_id                         = aws_cognito_user_pool.cap6635.id
  generate_secret                      = true
  allowed_oauth_flows                  = ["client_credentials"]
  supported_identity_providers         = ["COGNITO"]
  access_token_validity                = 3
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_scopes                 = aws_cognito_resource_server.resource_server.scope_identifiers
}

resource "aws_cognito_user_pool_domain" "cap6635" {
  domain          = aws_acm_certificate.api.domain_name
  certificate_arn = aws_acm_certificate_validation.api.certificate_arn
  user_pool_id    = aws_cognito_user_pool.cap6635.id
}
