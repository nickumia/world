
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~>6.28"
    }
  }
  cloud {
    organization = "kamutiv"

    workspaces {
      name = "lifegrowth"
    }
  }
}

# AWS Provider Configuration
provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Project     = "Life Tracker MVP"
      ManagedBy   = "Terraform"
    }
  }
}
