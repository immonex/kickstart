#!/usr/bin/env bash

SCRIPT_DIR=$(realpath "$(dirname "${BASH_SOURCE[0]}")")

download() {
    if [ `which curl` ]; then
        curl -Ls "$1" > "$2";
    elif [ `which wget` ]; then
        wget -nv -O "$2" "$1"
    fi
}

download https://phpdoc.org/phpDocumentor.phar $SCRIPT_DIR/phpdoc
chmod +x $SCRIPT_DIR/phpdoc