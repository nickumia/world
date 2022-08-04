
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
      name = "nlp-web-cd"
    }
  }
}

provider "aws" {
  # Configuration options
}
