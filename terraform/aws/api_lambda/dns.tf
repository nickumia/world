
data "aws_route53_zone" "kamutiv" {
  name = "kamutiv.com."
}

data "aws_acm_certificate" "cap6635" {
  domain = "cap6635.kamutiv.com"
  types  = ["AMAZON_ISSUED"]
}

resource "aws_api_gateway_domain_name" "cap6635" {
  certificate_arn = data.aws_acm_certificate.cap6635.arn
  domain_name     = "cap6635.kamutiv.com"
}

resource "aws_route53_record" "cap6635" {
  name    = aws_api_gateway_domain_name.cap6635.domain_name
  type    = "A"
  zone_id = data.aws_route53_zone.kamutiv.id

  alias {
    evaluate_target_health = true
    name                   = aws_api_gateway_domain_name.cap6635.cloudfront_domain_name
    zone_id                = aws_api_gateway_domain_name.cap6635.cloudfront_zone_id
  }
}
