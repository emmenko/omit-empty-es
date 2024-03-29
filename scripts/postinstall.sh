#!/usr/bin/env bash

set -e

echo "Preparing development setup."
yarn husky install
yarn preconstruct dev

echo "Running prettier on package.json files"
# We need to run prettier to avoid unnecessary formatting changes to package.json (due to Yarn install).
yarn prettier --write --parser json 'package.json' &>/dev/null
