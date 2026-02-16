
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

resource "aws_api_gateway_method" "life_tracker_method" {
  rest_api_id   = aws_api_gateway_rest_api.life_tracker_api.id
  resource_id   = aws_api_gateway_resource.life_tracker_resource.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "life_tracker_integration" {
  rest_api_id = aws_api_gateway_rest_api.life_tracker_api.id
  resource_id = aws_api_gateway_resource.life_tracker_resource.id
  http_method = aws_api_gateway_method.life_tracker_method.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.life_tracker_lambda.invoke_arn
}

resource "aws_api_gateway_method" "proxy_method" {
  rest_api_id   = aws_api_gateway_rest_api.life_tracker_api.id
  resource_id   = aws_api_gateway_resource.life_tracker_resource.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "proxy_integration" {
  rest_api_id = aws_api_gateway_rest_api.life_tracker_api.id
  resource_id = aws_api_gateway_resource.life_tracker_resource.id
  http_method = aws_api_gateway_method.proxy_method.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.life_tracker_lambda.invoke_arn
}

resource "aws_api_gateway_deployment" "life_tracker_deployment" {
  rest_api_id = aws_api_gateway_rest_api.life_tracker_api.id

  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.life_tracker_resource.id,
      aws_api_gateway_method.life_tracker_method.id,
      aws_api_gateway_integration.life_tracker_integration.id,
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

# Outputs
output "api_gateway_url" {
  description = "URL of the API Gateway endpoint"
  value       = "https://${aws_api_gateway_rest_api.life_tracker_api.id}.execute-api.${var.aws_region}.amazonaws.com/${aws_api_gateway_stage.life_tracker_stage.stage_name}/tracker"
}

output "s3_bucket_name" {
  description = "Name of the S3 bucket"
  value       = var.life_tracker_bucket_name
}

output "lambda_function_name" {
  description = "Name of the Lambda function"
  value       = aws_lambda_function.life_tracker_lambda.function_name
}
