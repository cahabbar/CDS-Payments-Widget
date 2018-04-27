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

@test "profileDomainUnknown" {
    AWS_PROFILE="blah"
    run profileDomain
    [ "$status" -eq 1 ]
    [ "$output" = "ERR: do not know domain names for AWS_PROFILE=$AWS_PROFILE" ]
}

@test "profileDomainProd" {
    AWS_PROFILE="cdsg-prod"
    run profileDomain
    [ "$status" -eq 0 ]
    [ -z "$output" ]
    profileDomain
    [ "cloud.buysub.com" = "$TF_VAR_zone_name_main" ]
    [ "ba-cloud.buysub.com" = "$TF_VAR_zone_name_other" ]
}

@test "profileDomainNonprod" {
    AWS_PROFILE="cdsg-nonprod"
    run profileDomain
    [ "$status" -eq 0 ]
    [ -z "$output" ]
    profileDomain
    [ "qa-cloud.buysub.com" = "$TF_VAR_zone_name_main" ]
    [ "test-cloud.buysub.com" = "$TF_VAR_zone_name_other" ]
}

@test "mainHappy" {
    AWS_PROFILE="cdsg-nonprod"
    AWS_DEFAULT_REGION="us-west-2"
    run main
    [ "$status" -eq 0 ]
}
