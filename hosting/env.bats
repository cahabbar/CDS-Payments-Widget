#!/usr/bin/env bats

source env.sh

@test "requiredEnvProfileMissing" {
    run requiredEnvProfile
    [ "$status" -eq 1 ]
    [ "$output" = "ERR: AWS_PROFILE is required" ]
}

@test "requiredEnvProfilePresent" {
    AWS_PROFILE="qux"
    run requiredEnvProfile
    [ "$status" -eq 0 ]
    [ -z "$output" ]
}

@test "requiredEnvRegionMissing" {
    run requiredEnvRegion
    [ "$status" -eq 1 ]
    [ "$output" = "ERR: AWS_DEFAULT_REGION is required" ]
}

@test "requiredEnvRegionPresent" {
    AWS_DEFAULT_REGION="baz"
    run requiredEnvRegion
    [ "$status" -eq 0 ]
    [ -z "$output" ]
}

@test "requiredEnvAppEnvMissing" {
    run requiredEnvAppEnv
    [ "$status" -eq 1 ]
    [ "$output" = "ERR: APP_ENV is required" ]
}

@test "profileDomainUnknown" {
    AWS_PROFILE="blah"
    APP_ENV="foo"
    run profileDomain
    echo "output = ${output}"
    [ "$status" -eq 1 ]
    [ "$output" = "ERR: no domain names for AWS_PROFILE=$AWS_PROFILE and APP_ENV=$APP_ENV" ]
}

@test "profileDomainGoodProfileBadEnv" {
    AWS_PROFILE="cdsg-nonprod"
    APP_ENV="ba"
    run profileDomain
    [ "$status" -eq 1 ]
    echo "output = ${output}"
    [ "$output" = "ERR: no domain names for AWS_PROFILE=$AWS_PROFILE and APP_ENV=$APP_ENV" ]
    [ -z "$TF_VAR_zone_name_main" ]
    [ -z "$TF_VAR_zone_name_other" ]
}

@test "profileDomainProd" {
    AWS_PROFILE="cdsg-prod"
    APP_ENV="prod"
    run profileDomain
    echo "output = ${output}"
    [ "$status" -eq 0 ]
    [ -z "$output" ]
    profileDomain
    [ "cloud.buysub.com" = "$TF_VAR_zone_name_main" ]
    [ "ba-cloud.buysub.com" = "$TF_VAR_zone_name_other" ]
    [ "prod" = "$TF_VAR_env_main" ]
    [ "ba" = "$TF_VAR_env_other" ]
}

@test "profileDomainNonprod" {
    AWS_PROFILE="cdsg-nonprod"
    APP_ENV="test"
    run profileDomain
    echo "output = ${output}"
    [ "$status" -eq 0 ]
    [ -z "$output" ]
    profileDomain
    [ "qa-cloud.buysub.com" = "$TF_VAR_zone_name_main" ]
    [ "test-cloud.buysub.com" = "$TF_VAR_zone_name_other" ]
    [ "qa" = "$TF_VAR_env_main" ]
    [ "test" = "$TF_VAR_env_other" ]
}

@test "exportsOne" {
    AWS_PROFILE="foo"
    AWS_DEFAULT_REGION="baz"
    APP_ENV="qux"
    run exports
    echo "output = ${output}"
    [ "$status" -eq 0 ]
    [ -z "$output" ]
    exports
    [ "$TF_VAR_account_name" = "$AWS_PROFILE" ] 
    [ "$TF_VAR_region" = "$AWS_DEFAULT_REGION" ]
    [ "$TF_VAR_app_cf_dns_name" = "payments" ]
    [ "$TF_VAR_application" = "paymentwidget" ]
    [ "$TF_VAR_app_bucket_name" = "$TF_VAR_account_name-$TF_VAR_application" ]
    [ "$TF_VAR_logging_bucket_name" = "$TF_VAR_app_bucket_name-logs-cloudfront" ]
}

@test "useEnvHappy" {
    AWS_PROFILE="cdsg-nonprod"
    AWS_DEFAULT_REGION="us-west-2"
    APP_ENV="qa"
    run useEnv 
    echo "output = ${output}"
    [ "$status" -eq 0 ]
}
