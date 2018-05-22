#!/usr/bin/env bash

set -e
. env.sh
useEnv

terraform plan -out plan.out