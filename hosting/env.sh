#!/usr/bin/env bash

requiredEnvProfile() {
    if [ -z "$AWS_PROFILE" ]; then
        echo "ERR: AWS_PROFILE is required"
        exit 1
    fi
}

requiredEnvRegion() {
    if [ -z "$AWS_DEFAULT_REGION" ]; then
        echo "ERR: AWS_DEFAULT_REGION is required"
        exit 1
    fi
}

profileDomain() {
    if [ "cdsg-prod" = "$AWS_PROFILE" ]; then 
        export TF_VAR_zone_name_main="cloud.buysub.com"
        export TF_VAR_zone_name_other="ba-cloud.buysub.com"
    elif [ "cdsg-nonprod" = "$AWS_PROFILE" ]; then 
        export TF_VAR_zone_name_main="qa-cloud.buysub.com"
        export TF_VAR_zone_name_other="test-cloud.buysub.com"
    else
        echo "ERR: do not know domain names for AWS_PROFILE=$AWS_PROFILE"
        exit 1
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
    requiredEnvProfile
    requiredEnvRegion
    profileDomain
    exports
}