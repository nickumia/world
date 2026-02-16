
variable "life_tracker_bucket_name" {
  description = "Name of the S3 bucket for life tracker data"
  type        = string
  default     = "nlp-dev"
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