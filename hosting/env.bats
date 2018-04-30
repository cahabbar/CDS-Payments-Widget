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

@test "requiredEnvAppEnvInvalid" {
    APP_ENV="foo"
    run requiredEnvAppEnv
    [ "$status" -eq 1 ]
    [ "$output" = "ERR: APP_ENV value $APP_ENV is invalid" ]
}

@test "requiredEnvAppEnvValidProd" {
    APP_ENV="prod"
    run requiredEnvAppEnv
    [ "$status" -eq 0 ]
    [ -z "$output" ]
    requiredEnvAppEnv
    [ "$TF_VAR_zone_name" = "cloud.buysub.com" ]
}

@test "requiredEnvAppEnvValidTest" {
    APP_ENV="test"
    run requiredEnvAppEnv
    [ "$status" -eq 0 ]
    [ -z "$output" ]
    requiredEnvAppEnv
    [ "$TF_VAR_zone_name" = "test-cloud.buysub.com" ]
}

@test "requiredEnvAppEnvValidTest" {
    APP_ENV="qa"
    run requiredEnvAppEnv
    [ "$status" -eq 0 ]
    [ -z "$output" ]
    requiredEnvAppEnv
    [ "$TF_VAR_zone_name" = "qa-cloud.buysub.com" ]
}

@test "exportsOne" {
    AWS_PROFILE="foo"
    AWS_DEFAULT_REGION="baz"
    APP_ENV="ba"
    run exports
    [ "$status" -eq 0 ]
    [ -z "$output" ]
    exports
    [ "$TF_VAR_account_name" = "$AWS_PROFILE" ] 
    [ "$TF_VAR_region" = "$AWS_DEFAULT_REGION" ]
    [ "$TF_VAR_app_env" = "$APP_ENV" ]
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
