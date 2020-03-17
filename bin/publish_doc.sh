#!/bin/bash
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

proceed=1

# Required environment variables (see below)
required=( DOCGEN_API_KEY_DE )

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
    printf "${RED}Publishing aborted${NC}\n"
    exit 1
fi

# Cleanup first.
doc-gen clean doc

# Generate and publish the documentation...
doc-gen publish $DOCGEN_API_KEY_DE doc

if [ $? -eq 0 ]
then
    printf "${GREEN}Documentation published${NC}\n"
    exit 0
else
    printf "${RED}Publishing failed${NC}\n"
    exit 1
fi
