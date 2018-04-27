#!/usr/bin/env bash -e

. env.sh
useEnv

sed "{
    s#FEATURE_DIR#${TF_VAR_application}#
    s#TF_VAR_account_name#${TF_VAR_account_name}#
    s#TF_VAR_region#${TF_VAR_region}#
}" backend.tf-template > backend.tf
terraform init