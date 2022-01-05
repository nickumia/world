
variable "ssh_key" {
  type = string
  description = "Key to ssh into EC2"
  default = ""
}

variable "region" {
  type = string
  description = "Default region to deploy to"
  default = "us-east-2"
}


