#!/usr/bin/env bash

set -e
. env.sh
useEnv
requiredEnvAppEnv

aws --profile $TF_VAR_account_name s3 sync ../docs s3://$TF_VAR_app_bucket_name/$APP_ENV --acl public-read
