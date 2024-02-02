#!/bin/bash
# vim:sw=4:ts=4:et:ai:ci:sr:nu:syntax=sh
##############################################################
# Usage ( * = optional ):                                    #
# ./load-sample-data.sh <sample-data-folder> *<db-address> *<db-port> *<username> *<password> #
##############################################################

if [ ! -z "$3" ]; then
    if [ ! -z "$4" ]; then
        echo "Using password authentication!"
        auth="--authenticationDatabase admin -u $3 -p $4"
    fi
fi

SAMPLE_DATA_FOLDER=${1:-sample-data} # default folder is sample-data
HOST=${2:-localhost} # default server is the localhost
PORT=${3:-27017}     # default port for MongoDB is 27017

if [ -d "${SAMPLE_DATA_FOLDER}" ] ; then
    echo "Importing data from directory: $SAMPLE_DATA_FOLDER"
    for data_file in $SAMPLE_DATA_FOLDER/*; do
        mongoimport --drop --host $HOST --port $PORT --db "movies-database" --collection "$(basename $data_file .json)" --file $data_file $auth
    done
fi
