#!/usr/bin/env bash -e

. env.sh
useEnv

aws --profile $TF_VAR_account_name s3 sync ../docs s3://$TF_VAR_app_bucket_name --acl public-read