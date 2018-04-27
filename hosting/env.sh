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

main() {
    requiredEnvProfile
    requiredEnvRegion
    profileDomain
}