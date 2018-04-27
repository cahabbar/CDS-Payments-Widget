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
variable "zone_name_main" {}

data "aws_route53_zone" "cloud" {
  name = "${var.zone_name_main}."
}

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

module "app_cloudfront" {
  logging_bucket         = "${var.logging_bucket_name}.s3.amazonaws.com"
  app_bucket_name        = "${var.app_bucket_name}.s3.amazonaws.com"
  name                   = "${var.application}-cloudfront"
  price_class            = "PriceClass_All"
  restriction_type       = "whitelist"
  origin_access_identity = "${aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path}"

  locations = [
    "US",
  ]

  max_ttl     = 300
  default_ttl = 0
  source      = "modules/cloudfront_distribution"
}

module "route53_record_app" {
  zone_id       = "${data.aws_route53_zone.cloud.zone_id}"
  zone_name     = "${var.app_cf_dns_name}.${data.aws_route53_zone.cloud.name}"
  zone_type     = "A"
  alias_name    = "${module.app_cloudfront.cloudfront_domain_name}"
  alias_zone_id = "${module.app_cloudfront.cloudfront_hosted_zone_id}"
  source        = "modules/route53_record_alias"
}
