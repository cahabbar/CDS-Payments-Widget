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
    BASE_ZONE="cloud.buysub.com"
    if [ -z "$APP_ENV" ]; then
        echo "ERR: APP_ENV is required"
        return 1
    elif [ "prod" = "$APP_ENV" ]; then
        export TF_VAR_zone_name="$BASE_ZONE"
    elif [ "ba" = "$APP_ENV" ]; then
        export TF_VAR_zone_name="ba-$BASE_ZONE"
    elif [ "qa" = "$APP_ENV" ]; then
        export TF_VAR_zone_name="qa-$BASE_ZONE"
    elif [ "test" = "$APP_ENV" ]; then
        export TF_VAR_zone_name="test-$BASE_ZONE"
    else
        echo "ERR: APP_ENV value $APP_ENV is invalid"
        return 1
    fi
}

exports() {
    export TF_VAR_account_name="$AWS_PROFILE"
    export TF_VAR_region="$AWS_DEFAULT_REGION"
    export TF_VAR_app_env="$APP_ENV"
    export TF_VAR_app_cf_dns_name="payments"
    export TF_VAR_application="paymentwidget"
    export TF_VAR_app_bucket_name="$TF_VAR_account_name-$TF_VAR_application"
    export TF_VAR_logging_bucket_name="$TF_VAR_app_bucket_name-logs-cloudfront"
}

useEnv() {
    set -e
    requiredEnvProfile
    requiredEnvRegion
    requiredEnvAppEnv
    exports
}