
# Lambda IAM Role and Policy
resource "aws_iam_role" "life_tracker_lambda_role" {
  name = "life_tracker_lambda_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name        = "Life Tracker Lambda Role"
    Environment = var.environment
    Project     = "Life Tracker MVP"
  }
}

resource "aws_iam_policy" "life_tracker_lambda_policy" {
  name        = "life_tracker_lambda_policy"
  description = "Policy for Life Tracker Lambda function"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      },
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject"
        ]
        Resource = [
          "arn:aws:s3:::${var.life_tracker_bucket_name}",
          "arn:aws:s3:::${var.life_tracker_bucket_name}/*"
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "life_tracker_lambda_policy_attachment" {
  role       = aws_iam_role.life_tracker_lambda_role.name
  policy_arn = aws_iam_policy.life_tracker_lambda_policy.arn
}

# Lambda Function
resource "aws_lambda_function" "life_tracker_lambda" {
  function_name    = "life_tracker_api"
  role           = aws_iam_role.life_tracker_lambda_role.arn
  handler        = "lambda_function.lambda_handler"
  runtime        = "python3.9"
  timeout        = 30

  environment {
    variables = {
      S3_BUCKET_NAME = var.life_tracker_bucket_name
      DEBUG         = "false"
    }
  }

  filename         = "lambda_function.zip"
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  tags = {
    Name        = "Life Tracker API Lambda"
    Environment = var.environment
    Project     = "Life Tracker MVP"
  }
}

# Create zip file for Lambda
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = "${path.module}/lambda_function.py"
  output_path = "${path.module}/lambda_function.zip"
}

# API Gateway
resource "aws_api_gateway_rest_api" "life_tracker_api" {
  name        = "Life Tracker API"
  description = "API Gateway for Life Tracker MVP"

  tags = {
    Name        = "Life Tracker API Gateway"
    Environment = var.environment
    Project     = "Life Tracker MVP"
  }
}

resource "aws_api_gateway_resource" "life_tracker_resource" {
  rest_api_id = aws_api_gateway_rest_api.life_tracker_api.id
  parent_id   = aws_api_gateway_rest_api.life_tracker_api.root_resource_id
  path_part   = "tracker"
}

locals {
  http_methods = ["GET", "POST", "OPTIONS"]
}

resource "aws_api_gateway_method" "life_tracker_method" {
  for_each      = toset(local.http_methods)
  rest_api_id   = aws_api_gateway_rest_api.life_tracker_api.id
  resource_id   = aws_api_gateway_resource.life_tracker_resource.id
  http_method   = each.key
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "life_tracker_integration" {
  for_each      = toset(["GET", "POST"])
  rest_api_id   = aws_api_gateway_rest_api.life_tracker_api.id
  resource_id   = aws_api_gateway_resource.life_tracker_resource.id
  http_method   = aws_api_gateway_method.life_tracker_method[each.key].http_method
  type          = "AWS_PROXY"
  integration_http_method = "POST"  # AWS_PROXY always uses POST
  uri           = aws_lambda_function.life_tracker_lambda.invoke_arn
}

# Integration responses for GET method (AWS_PROXY needs explicit responses)
resource "aws_api_gateway_integration_response" "life_tracker_get_integration_response" {
  rest_api_id = aws_api_gateway_rest_api.life_tracker_api.id
  resource_id = aws_api_gateway_resource.life_tracker_resource.id
  http_method = aws_api_gateway_method.life_tracker_method["GET"].http_method
  status_code = "200"
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'"
    "method.response.header.Access-Control-Allow-Methods" = "'GET,POST,OPTIONS'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }
}

# Integration responses for POST method (AWS_PROXY needs explicit responses)
resource "aws_api_gateway_integration_response" "life_tracker_post_integration_response" {
  rest_api_id = aws_api_gateway_rest_api.life_tracker_api.id
  resource_id = aws_api_gateway_resource.life_tracker_resource.id
  http_method = aws_api_gateway_method.life_tracker_method["POST"].http_method
  status_code = "200"
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'"
    "method.response.header.Access-Control-Allow-Methods" = "'GET,POST,OPTIONS'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }
}

# OPTIONS method for CORS (separate from Lambda integration)
resource "aws_api_gateway_integration" "life_tracker_options_integration" {
  rest_api_id = aws_api_gateway_rest_api.life_tracker_api.id
  resource_id = aws_api_gateway_resource.life_tracker_resource.id
  http_method = aws_api_gateway_method.life_tracker_method["OPTIONS"].http_method
  type        = "MOCK"
  
  request_templates = {
    "application/json" = "{\"statusCode\": 200}"
  }
  
  # Ensure this is created after the OPTIONS method
  depends_on = [aws_api_gateway_method.life_tracker_method]
}

resource "aws_api_gateway_method_response" "life_tracker_options_method_response" {
  rest_api_id = aws_api_gateway_rest_api.life_tracker_api.id
  resource_id = aws_api_gateway_resource.life_tracker_resource.id
  http_method = aws_api_gateway_method.life_tracker_method["OPTIONS"].http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

resource "aws_api_gateway_integration_response" "life_tracker_options_response" {
  rest_api_id = aws_api_gateway_rest_api.life_tracker_api.id
  resource_id = aws_api_gateway_resource.life_tracker_resource.id
  http_method = aws_api_gateway_method.life_tracker_method["OPTIONS"].http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'"
    "method.response.header.Access-Control-Allow-Methods" = "'GET,POST,OPTIONS'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }
  
  # Ensure this is created after the method response
  depends_on = [aws_api_gateway_method_response.life_tracker_options_method_response]
}

resource "aws_api_gateway_deployment" "life_tracker_deployment" {
  rest_api_id = aws_api_gateway_rest_api.life_tracker_api.id

  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.life_tracker_resource.id,
      values(aws_api_gateway_method.life_tracker_method)[*].id,
      values(aws_api_gateway_integration.life_tracker_integration)[*].id,
      aws_api_gateway_integration_response.life_tracker_get_integration_response.id,
      aws_api_gateway_integration_response.life_tracker_post_integration_response.id,
      aws_api_gateway_integration.life_tracker_options_integration.id,
      aws_api_gateway_method_response.life_tracker_options_method_response.id,
      aws_api_gateway_integration_response.life_tracker_options_response.id,
      aws_lambda_permission.life_tracker_api_permission.id,
    ]))
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "life_tracker_stage" {
  deployment_id = aws_api_gateway_deployment.life_tracker_deployment.id
  rest_api_id   = aws_api_gateway_rest_api.life_tracker_api.id
  stage_name    = var.environment

  # Enable CORS
  xray_tracing_enabled = false

  # CORS configuration
  variables = {
    enableCors = true
    allowedOrigins = "*"
    allowedHeaders = "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent"
    allowedMethods = "GET,POST,OPTIONS"
  }

  tags = {
    Name        = "Life Tracker API Stage"
    Environment = var.environment
    Project     = "Life Tracker MVP"
  }
}

# Lambda permission for API Gateway
resource "aws_lambda_permission" "life_tracker_api_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.life_tracker_lambda.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.life_tracker_api.execution_arn}/*"
}