#!/usr/bin/env bash

set -e
. env.sh
useEnv

terraform apply plan.out