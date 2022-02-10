data "aws_route53_zone" "primary" {
  name = "kamutiv.com"
}

resource "aws_route53_health_check" "nlp_lb" {
  fqdn              = aws_lb.nlp_lb.dns_name
  port              = 80
  type              = "HTTP"
  resource_path     = "/"
  failure_threshold = "5"
  request_interval  = "10"

  tags = {
    Name = "nlp-web-lb-health-check"
  }
}

resource "aws_route53_record" "main" {
  zone_id         = data.aws_route53_zone.primary.zone_id
  name            = "kamutiv.com"
  type            = "A"
  health_check_id = aws_route53_health_check.nlp_lb.id
  set_identifier  = "live"

  failover_routing_policy {
    type = "PRIMARY"
  }

  alias {
    name                   = aws_lb.nlp_lb.dns_name
    zone_id                = aws_lb.nlp_lb.zone_id
    evaluate_target_health = true
  }

}
