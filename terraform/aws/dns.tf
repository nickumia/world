data "aws_route53_zone" "primary" {
  name      = "kamutiv.com"
  sensitive = var.sensitivity
}

resource "aws_route53_record" "main" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = "kamutiv.com"
  type    = "A"

  alias {
    name                   = aws_lb.nlp_lb.dns_name
    zone_id                = aws_lb.nlp_lb.zone_id
    evaluate_target_health = true
  }
  sensitive = var.sensitivity
}
