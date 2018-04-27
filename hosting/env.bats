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

@test "pro err" {
    AWS_PROFILE="blah"
    run profileDomain
    [ "$status" -eq 1 ]
    [ "$output" = "ERR: do not know domain names for AWS_PROFILE=$AWS_PROFILE" ]
}

@test "pro good" {
    AWS_PROFILE="cdsg-prod"
    run profileDomain
    [ "$status" -eq 0 ]
    [ "$output" = "good" ]
}

@test "mainHappy" {
    AWS_PROFILE="foo"
    AWS_DEFAULT_REGION="bar"
    run main
    [ "$status" -eq 0 ]
}
