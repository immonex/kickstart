#!/bin/bash
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

proceed=1

# Required environment variables (see below)
required=( TEST_DB_HOST TEST_DB_NAME TEST_DB_USER TEST_DB_PASSWORD )

# Fetch environment variables from all relevant .env files (if existent).
test -f .env && source .env
test -f .env.local && source .env.local

# Check for missing environment variables.
for var in ${required[@]}
do
    if [ -z ${!var} ]
    then
        printf "Environment variable missing: %s\n" $var
        proceed=0
    fi
done

if ((!$proceed))
then
    printf "${RED}Installation of test environment aborted${NC}\n"
    exit 0 # no NPM error logging
fi

# Invoke WP test environment installation script.
./bin/install-wp-tests.sh $TEST_DB_NAME $TEST_DB_USER $TEST_DB_PASSWORD $TEST_DB_HOST latest true
