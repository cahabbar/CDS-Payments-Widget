#!/usr/bin/env bash

set -e
. env.sh
useEnv
requiredEnvAppEnv

unset AWS_PROFILE
aws s3 sync ../docs s3://$TF_VAR_app_bucket_name/$APP_ENV --acl public-read
