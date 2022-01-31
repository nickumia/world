data "aws_route53_zone" "primary" {
  name = "kamutiv.com"
}

# resource "aws_route53_record" "www" {
#   zone_id = data.aws_route53_zone.primary.zone_id
#   name    = "www.kamutiv.com"
#   type    = "A"
#   ttl     = "86400"
#   records = [aws_instance.web.public_ip]
# }

# resource "aws_route53_record" "main" {
#   zone_id = data.aws_route53_zone.primary.zone_id
#   name    = "kamutiv.com"
#   type    = "A"
# 
#   alias {
#     name                   = aws_route53_record.www.name
#     zone_id = data.aws_route53_zone.primary.zone_id
#     evaluate_target_health = false
# 
#   }
# }

resource "aws_route53_record" "main" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = "kamutiv.com"
  type    = "A"

  alias {
    name                   = aws_lb.nlp_lb.dns_name
    zone_id                = aws_lb.nlp_lb.zone_id
    evaluate_target_health = true
  }
}
