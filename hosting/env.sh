#!/usr/bin/env bash

requiredEnvProfile() {
    if [ -z "$AWS_PROFILE" ]; then
        echo "ERR: AWS_PROFILE is required"
        return 1
    fi
}

requiredEnvRegion() {
    if [ -z "$AWS_DEFAULT_REGION" ]; then
        echo "ERR: AWS_DEFAULT_REGION is required"
        return 1
    fi
}

requiredEnvAppEnv() {
    if [ -z "$APP_ENV" ]; then
        echo "ERR: APP_ENV is required"
        return 1
    fi

    profileDomain
    if [ "$APP_ENV" != "$TF_VAR_env_main" ] && [ "$APP_ENV" != "$TF_VAR_env_other" ]; then
        echo "ERR: APP_ENV=$APP_ENV invalid for AWS_PROFILE=$AWS_PROFILE"
        return 1
    fi
}

profileDomain() {
    if [ "cdsg-prod" = "$AWS_PROFILE" ]; then
        export TF_VAR_env_main="prod"
        export TF_VAR_env_other="ba"
        export TF_VAR_zone_name_main="cloud.buysub.com"
        export TF_VAR_zone_name_other="ba-cloud.buysub.com"
        export TF_VAR_acm_cert_arn_main=""
        export TF_VAR_acm_cert_arn_other=""
    elif [ "cdsg-nonprod" = "$AWS_PROFILE" ]; then
        export TF_VAR_env_main="qa"
        export TF_VAR_env_other="test"
        export TF_VAR_zone_name_main="qa-cloud.buysub.com"
        export TF_VAR_zone_name_other="test-cloud.buysub.com"
        export TF_VAR_acm_cert_arn_main="arn:aws:acm:us-east-1:590449824367:certificate/001ac5b1-9851-46a1-a9ff-52d8b8705a6b"
        export TF_VAR_acm_cert_arn_other="arn:aws:acm:us-east-1:590449824367:certificate/333f41f7-2058-4ab3-87d0-8ebb84a944f0"
    fi

    if [[ -z "$TF_VAR_zone_name_main" && -z "$TF_VAR_zone_name_other" ]]; then
        echo "ERR: no domain names for AWS_PROFILE=$AWS_PROFILE"
        return 1
    fi
}

exports() {
    export TF_VAR_account_name="$AWS_PROFILE"
    export TF_VAR_region="$AWS_DEFAULT_REGION"
    export TF_VAR_app_cf_dns_name="payments"
    export TF_VAR_application="paymentwidget"
    export TF_VAR_app_bucket_name="$TF_VAR_account_name-$TF_VAR_application"
    export TF_VAR_logging_bucket_name="$TF_VAR_app_bucket_name-logs-cloudfront"
}

useEnv() {
    env |grep ^A
    set -e
    requiredEnvProfile
    requiredEnvRegion
    profileDomain
    exports
}
