
variable "instance_type" {
  type = string
  description = "The type of EC2 instance to use"
  default = "t3a.micro"
}

variable "region" {
  type        = string
  description = "Default region to deploy to"
  default     = "us-east-2"
}

variable "ssh_hosts" {
  type = list
  description = "Hosts to allow ssh from"
  default = []
}

variable "ssh_keys" {
  type = string
  description = "SSH key to connect"
  default = ""

variable "port" {
  type = number
  description = "Web App port number"
  default = 80
}
