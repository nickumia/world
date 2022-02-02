
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "3.70.0"
    }
  }
  cloud {
    organization = "kamutiv"

    workspaces {
      name = "nlp-web"
    }
  }
}

provider "aws" {
  # Configuration options
}
