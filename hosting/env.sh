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
    fi
}

profileDomain() {
    if [ "cdsg-prod" = "$AWS_PROFILE" ]; then
        if [ "prod" = "$APP_ENV" ] || [ "ba" = "$APP_ENV" ]; then
            export TF_VAR_env_main="prod"
            export TF_VAR_env_other="ba"
            export TF_VAR_zone_name_main="cloud.buysub.com"
            export TF_VAR_zone_name_other="ba-cloud.buysub.com"
        fi
    elif [ "cdsg-nonprod" = "$AWS_PROFILE" ]; then
        if [ "qa" = "$APP_ENV" ] || [ "test" = "$APP_ENV" ]; then
            export TF_VAR_env_main="qa"
            export TF_VAR_env_other="test"
            export TF_VAR_zone_name_main="qa-cloud.buysub.com"
            export TF_VAR_zone_name_other="test-cloud.buysub.com"
        fi
    fi

    if [[ -z "$TF_VAR_zone_name_main" && -z "$TF_VAR_zone_name_other" ]]; then
        echo "ERR: no domain names for AWS_PROFILE=$AWS_PROFILE and APP_ENV=$APP_ENV"
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
    requiredEnvAppEnv
    profileDomain
    exports
}