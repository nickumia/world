
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~>4.24"
    }
  }
  cloud {
    organization = "kamutiv"

    workspaces {
      name = "nlp-web-api-lambda"
    }
  }
}

provider "aws" {
  # Configuration options
  region = "us-east-1"
}
