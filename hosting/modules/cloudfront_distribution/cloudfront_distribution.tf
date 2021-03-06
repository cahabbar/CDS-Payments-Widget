variable "cache_allowed_methods" {
  type = "list"

  default = [
    "DELETE",
    "GET",
    "HEAD",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
  ]
}

variable "enabled" {
  default = true
}

variable "locations" {
  type = "list"
}

variable "origin_protocol_policy" {
  default = "match-viewer"
}

variable "alias" {
  default = ""
}

variable "default_root_object" {
  default = ""
}

variable "origin_path" {
  default = ""
}

variable "origin_env" {
  default = ""
}

variable "app_bucket_name" {}
variable "logging_bucket" {}
variable "max_ttl" {}
variable "default_ttl" {}
variable "name" {}
variable "price_class" {}
variable "restriction_type" {}
variable "origin_access_identity" {}
variable "acm_certificate_arn" {}

output "cloudfront_domain_name" {
  value = "${aws_cloudfront_distribution.distribution.domain_name}"
}

output "cloudfront_hosted_zone_id" {
  value = "${aws_cloudfront_distribution.distribution.hosted_zone_id}"
}

resource "aws_cloudfront_distribution" "distribution" {
  default_cache_behavior {
    allowed_methods = [
      "${var.cache_allowed_methods}",
    ]

    cached_methods = [
      "GET",
      "HEAD",
    ]

    default_ttl = "${var.default_ttl}"

    forwarded_values = {
      headers = ["Origin"]

      cookies {
        forward = "none"
      }

      query_string = true
    }

    max_ttl                = "${var.max_ttl}"
    min_ttl                = 0
    target_origin_id       = "websiteS3Origin${var.origin_env}"
    viewer_protocol_policy = "redirect-to-https"
  }

  enabled = "${var.enabled}"

  logging_config {
    bucket          = "${var.logging_bucket}"
    include_cookies = true
    prefix          = "websiteS3Origin${var.origin_env}"
  }

  aliases = ["${var.alias}"]

  default_root_object = "${var.default_root_object}"

  origin {
    domain_name = "${var.app_bucket_name}"
    origin_id   = "websiteS3Origin${var.origin_env}"
    origin_path = "${var.origin_path}"

    s3_origin_config {
      origin_access_identity = "${var.origin_access_identity}"
    }
  }

  price_class = "${var.price_class}"

  tags {
    Name = "${var.name}"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = "${var.acm_certificate_arn}"
    ssl_support_method  = "sni-only"
  }
}
