
output "api_url" {
  value = aws_api_gateway_domain_name.cap6635.domain_name
}

data "aws_route53_zone" "kamutiv" {
  name = "kamutiv.com."
}

###############################################################################

# Grant API Gateway access to custom domain certificate
resource "aws_api_gateway_domain_name" "cap6635" {
  certificate_arn = aws_acm_certificate_validation.cap6635.certificate_arn
  domain_name     = "cap6635.kamutiv.com"
}

# Point custom domain to API Gateway
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

# Point custom domain to Cognito Auth
resource "aws_route53_record" "api" {
  name    = aws_acm_certificate.api.domain_name
  type    = "A"
  zone_id = data.aws_route53_zone.kamutiv.id

  alias {
    evaluate_target_health = true
    name                   = aws_api_gateway_domain_name.cap6635.cloudfront_domain_name
    zone_id                = aws_api_gateway_domain_name.cap6635.cloudfront_zone_id
  }
}

###############################################################################
# Create SSL Certificates for all custom domains

resource "aws_acm_certificate" "cap6635" {
  domain_name       = "cap6635.kamutiv.com"
  validation_method = "DNS"

  validation_option {
    domain_name       = "cap6635.kamutiv.com"
    validation_domain = "kamutiv.com"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "cap6635" {
  certificate_arn         = aws_acm_certificate.cap6635.arn
  validation_record_fqdns = [for record in aws_route53_record.cap6635_validation : record.fqdn]
}

resource "aws_acm_certificate" "api" {
  domain_name       = "api.kamutiv.com"
  validation_method = "DNS"

  validation_option {
    domain_name       = "api.kamutiv.com"
    validation_domain = "kamutiv.com"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "api" {
  certificate_arn         = aws_acm_certificate.api.arn
  validation_record_fqdns = [for record in aws_route53_record.api_validation : record.fqdn]
}

resource "aws_route53_record" "cap6635_validation" {
  for_each = {
    for dvo in aws_acm_certificate.cap6635.domain_validation_options : dvo.domain_name => {
      name    = dvo.resource_record_name
      record  = dvo.resource_record_value
      type    = dvo.resource_record_type
      zone_id = dvo.domain_name == "kamutiv.com" ? data.aws_route53_zone.kamutiv.zone_id : data.aws_route53_zone.kamutiv.zone_id
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = each.value.zone_id
}

resource "aws_route53_record" "api_validation" {
  for_each = {
    for dvo in aws_acm_certificate.api.domain_validation_options : dvo.domain_name => {
      name    = dvo.resource_record_name
      record  = dvo.resource_record_value
      type    = dvo.resource_record_type
      zone_id = dvo.domain_name == "kamutiv.com" ? data.aws_route53_zone.kamutiv.zone_id : data.aws_route53_zone.kamutiv.zone_id
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = each.value.zone_id
}
