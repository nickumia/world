
variable "life_tracker_bucket_name" {
  description = "Name of the S3 bucket for life tracker data"
  type        = string
  default     = "offline.kamutiv.com"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "dev"
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
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
