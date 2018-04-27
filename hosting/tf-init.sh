#!/usr/bin/env bash -e

. env.sh
useEnv

terraform init \
     -backend-config "bucket=$TF_VAR_tf_state_bucket" \
     -backend-config "profile=$TF_VAR_account_name" \
     -backend-config "region=$TF_VAR_region" \
     -backend-config "key=$TF_VAR_application/terraform.tfstate"