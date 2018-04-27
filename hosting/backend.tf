terraform {
  backend "s3" {}
}

data "terraform_remote_state" "state" {
  backend = "s3"

  config {
    bucket  = "${var.tf_state_bucket}"
    key     = "${var.application}/terraform.tfstate"
    encrypt = "true"
    profile = "${var.account_name}"
    region  = "${var.region}"
  }
}
