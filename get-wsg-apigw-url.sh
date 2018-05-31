#!/usr/bin/env bash

# example script to demonstrate looking up the APIGW URL for WSG

APIGW_BASE_NAME=PW-AWS
APP_ENV=test
export AWS_PROFILE=cdsg-nonprod
export AWS_DEFAULT_REGION=us-east-1

WSG_APIGW_ID=`aws apigateway get-rest-apis | jq -r '.items[] | { id: .id, name: .name}'|grep -B2 -A1 "$APP_ENV-$APIGW_BASE_NAME"| jq -jr .id`
WSG_APIGW_URL="https://$WSG_APIGW_ID.execute-api.$AWS_DEFAULT_REGION.amazonaws.com/$APP_ENV/"

echo "WSG_APIGW_URL=$WSG_APIGW_URL"

# if you need local dev, you'll want to subsitute this value in the file below
#sed #WSG_APIGW_URL#$WSG_APIGW_URL# app/components/ui-layout.js