#!/bin/bash
set -e


# Defining functions
setConfig() {
	echo $1 >> "$PGDATA/postgresql.conf"
}


# Set configuration
setConfig "listen_addresses = '*'"
setConfig "port = $POSTGRES_PORT"