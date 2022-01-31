
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "nlp-vpc"
  cidr = "172.20.0.0/16"

  azs             = ["${var.region}a", "${var.region}b"]
  private_subnets = ["172.20.1.0/24", "172.20.2.0/24"]
  public_subnets  = ["172.20.101.0/24", "172.20.102.0/24"]

  enable_nat_gateway = false
  single_nat_gateway = false
  enable_dns_hostnames = true

  enable_classiclink = false
  enable_classiclink_dns_support = false

  tags = {
    Terraform = "true"
    Environment = "production"
  }
}

resource "aws_network_interface" "private_nlp" {
  subnet_id   = module.vpc.public_subnets[0]
  private_ips = ["172.20.101.100"]
  security_groups = [aws_security_group.allow_web.id]

  tags = {
    Name = "nlp-public-interface"
  }
}

resource "aws_security_group" "allow_web" {
  name        = "allow_web"
  description = "Allow HTTP/S Traffic"
  vpc_id      = module.vpc.vpc_id

  ingress {
    description      = "HTTP to VPC"
    from_port        = 80
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name = "allow_web"
  }
}

resource "aws_security_group_rule" "allow_https" {
  type              = "ingress"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.allow_web.id
}

resource "aws_security_group_rule" "allow_test" {
  type              = "ingress"
  from_port         = 8080
  to_port           = 8080
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.allow_web.id
}

resource "aws_security_group_rule" "allow_ssh" {
  type              = "ingress"
  from_port         = 22
  to_port           = 22
  protocol          = "tcp"
  cidr_blocks       = var.ssh_hosts
  security_group_id = aws_security_group.allow_web.id
}

# Load Balancer

resource "aws_lb" "nlp_lb" {
  name               = "nlpalb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.allow_web.id]
  subnets            = module.vpc.private_subnets

  enable_deletion_protection = false

  # TODO: Write logs to somewhere
  # access_logs {
  #   bucket  = aws_s3_bucket.lb_logs.bucket
  #   prefix  = "test-lb"
  #   enabled = true
  # }

  tags = {
    Environment = "production-nlp-web"
  }
}

resource "aws_lb_target_group" "nlp_web" {
  name     = "nlpwebtg"
  port     = var.port
  protocol = "HTTP"
  vpc_id   = module.vpc.vpc_id

  health_check {
    healthy_threshold = 5
    unhealthy_threshold = 5
    interval = 30
    matcher = "200,302,404"
    path = "/index"
    timeout = 10
  }
}

resource "aws_lb_target_group_attachment" "nlp_instance" {
  target_group_arn = aws_lb_target_group.nlp_web.arn
  target_id        = aws_instance.web.id
  port             = var.port
}

data "aws_acm_certificate" "kamutiv_ssl" {
  domain   = "kamutiv.com"
  statuses = ["ISSUED"]
  types    = ["AMAZON_ISSUED"]
}

resource "aws_lb_listener" "nlp_443" {
  load_balancer_arn = aws_lb.nlp_lb.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = data.aws_acm_certificate.kamutiv_ssl.id

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.nlp_web.arn
  }
}

resource "aws_lb_listener" "nlp_80" {
  load_balancer_arn = aws_lb.nlp_lb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_listener" "lb_test_8080" {
  load_balancer_arn = aws_lb.nlp_lb.arn
  port              = "8080"
  protocol          = "HTTP"

  default_action {
    type = "fixed-response"

    fixed_response {
      content_type = "text/plain"
      message_body = "Fixed response content"
      status_code  = "200"
    }
  }
}
