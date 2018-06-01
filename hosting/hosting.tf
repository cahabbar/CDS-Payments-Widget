provider "aws" {
  profile = "${var.account_name}"
  region  = "${var.region}"
}

variable "account_name" {}
variable "region" {}

variable "logging_bucket_name" {}
variable "app_bucket_name" {}
variable "application" {}
variable "app_cf_dns_name" {}
variable "env_main" {}
variable "env_other" {}
variable "zone_name_main" {}
variable "zone_name_other" {}
variable "acm_cert_arn_main" {}
variable "acm_cert_arn_other" {}

data "aws_iam_account_alias" "current" {}

data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["arn:aws:s3:::${var.app_bucket_name}/*"]

    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn}"]
    }
  }
}

resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "${var.application} hosting"
}

module "s3_cloudfront_logging" {
  bucket_name       = "${var.logging_bucket_name}"
  lifecycle_enabled = true
  source            = "modules/s3_bucket_no_logging"
}

module "s3_cloudfront_ui" {
  bucket_name       = "${var.app_bucket_name}"
  lifecycle_enabled = true
  policy            = "${data.aws_iam_policy_document.s3_policy.json}"
  source            = "modules/s3_bucket_no_logging"
}

data "aws_route53_zone" "main" {
  name = "${var.zone_name_main}."
}

module "app_cloudfront_main" {
  logging_bucket         = "${var.logging_bucket_name}.s3.amazonaws.com"
  app_bucket_name        = "${var.app_bucket_name}.s3.amazonaws.com"
  name                   = "${var.application}-cloudfront"
  price_class            = "PriceClass_All"
  restriction_type       = "whitelist"
  origin_access_identity = "${aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path}"
  alias                  = "${var.app_cf_dns_name}.${var.zone_name_main}"
  origin_path            = "/${var.env_main}"
  origin_env             = "-${var.env_main}"

  locations = [
    "US",
  ]

  max_ttl             = 300
  default_ttl         = 0
  default_root_object = "index.html"
  acm_certificate_arn = "${var.acm_cert_arn_main}"
  source              = "modules/cloudfront_distribution"
}

module "route53_record_app_main" {
  zone_id       = "${data.aws_route53_zone.main.zone_id}"
  zone_name     = "${var.app_cf_dns_name}.${data.aws_route53_zone.main.name}"
  zone_type     = "A"
  alias_name    = "${module.app_cloudfront_main.cloudfront_domain_name}"
  alias_zone_id = "${module.app_cloudfront_main.cloudfront_hosted_zone_id}"
  source        = "modules/route53_record_alias"
}

data "aws_route53_zone" "other" {
  name = "${var.zone_name_other}."
}

module "app_cloudfront_other" {
  logging_bucket         = "${var.logging_bucket_name}.s3.amazonaws.com"
  app_bucket_name        = "${var.app_bucket_name}.s3.amazonaws.com"
  name                   = "${var.application}-cloudfront"
  price_class            = "PriceClass_All"
  restriction_type       = "whitelist"
  origin_access_identity = "${aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path}"
  alias                  = "${var.app_cf_dns_name}.${var.zone_name_other}"
  origin_path            = "/${var.env_other}"
  origin_env             = "-${var.env_other}"

  locations = [
    "US",
  ]

  max_ttl             = 300
  default_ttl         = 0
  default_root_object = "index.html"
  acm_certificate_arn = "${var.acm_cert_arn_other}"
  source              = "modules/cloudfront_distribution"
}

module "route53_record_app_other" {
  zone_id       = "${data.aws_route53_zone.other.zone_id}"
  zone_name     = "${var.app_cf_dns_name}.${data.aws_route53_zone.other.name}"
  zone_type     = "A"
  alias_name    = "${module.app_cloudfront_other.cloudfront_domain_name}"
  alias_zone_id = "${module.app_cloudfront_other.cloudfront_hosted_zone_id}"
  source        = "modules/route53_record_alias"
}
