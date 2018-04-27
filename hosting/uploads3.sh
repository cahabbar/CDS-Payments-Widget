#!/usr/bin/env bash -e

. env.sh

aws --profile $TF_VAR_account_name s3 sync . s3://$TF_VAR_app_bucket_name --acl public-read