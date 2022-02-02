variable "sensitivity" {
  type        = bool
  description = "Hide details on terraform plans/outputs"
  default     = true
}

variable "instance_type" {
  type        = string
  description = "The type of EC2 instance to use"
  default     = "t3a.micro"
}

variable "db_instance_type" {
  type        = string
  description = "The compute type of the RDS instance"
  default     = "db.t4g.micro"
}

variable "es_instance_type" {
  type        = string
  description = "The compute type of the ElasticSearch instance"
  default     = "t2.micro.search"
}

variable "region" {
  type        = string
  description = "Default region to deploy to"
  default     = "us-east-2"
}

variable "ssh_hosts" {
  type        = list(any)
  description = "Hosts to allow ssh from"
  default     = []
}

variable "ssh_keys" {
  type        = string
  description = "SSH key to connect"
  default     = ""
}

variable "port" {
  type        = number
  description = "Web App port number"
  default     = 80
}

variable "db_name" {
  type        = string
  description = "Database name"
  default     = ""
}
variable "db_user" {
  type        = string
  description = "Database username"
  default     = ""
}
variable "db_pass" {
  type        = string
  description = "Database password"
  default     = ""
}
