data "aws_caller_identity" "current" {}

resource "aws_elasticsearch_domain" "nlpes" {
  domain_name           = "nlpes"
  elasticsearch_version = "7.10"

  cluster_config {
    # instance_type = "t2.small.search"
    instance_type          = "t2.small.elasticsearch"
    instance_count         = 1
    warm_enabled           = false
    zone_awareness_enabled = false
  }

  vpc_options {
    subnet_ids         = [module.vpc.private_subnets[0]]
    security_group_ids = [aws_security_group.allow_web.id]
  }

  access_policies = <<-CONFIG
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": "es:*",
        "Principal": "*",
        "Effect": "Allow",
        "Resource": "arn:aws:es:${var.region}:${data.aws_caller_identity.current.account_id}:domain/nlpes/*"
      }
    ]
  }
  CONFIG

  ebs_options {
    ebs_enabled = true
    volume_size = 10
  }

  encrypt_at_rest {
    enabled = false
  }
  node_to_node_encryption {
    enabled = true
  }
  domain_endpoint_options {
    enforce_https       = false
    tls_security_policy = "Policy-Min-TLS-1-2-2019-07"
  }

  tags = {
    Domain = "TestDomain"
  }
}
