#!/bin/bash
set -x
set -m

/entrypoint.sh couchbase-server &

sleep 15

LOCALHOST='localhost'
DATABASE_PORT='8091'
echo "DATABASE_PORT: $DATABASE_PORT"
USERNAME=Administrator
PASSWORD=password
SYNC_GATEWAY_PORT='4985'


# Setup
curl -v http://$LOCALHOST:$DATABASE_PORT/pools/default -d memoryQuota=512 -d indexMemoryQuota=256 -d ftsMemoryQuota=256
curl -v http://$LOCALHOST:$DATABASE_PORT/node/controller/setupServices -d services=kv%2Cn1ql%2Cindex%2Cfts
curl -v http://$LOCALHOST:$DATABASE_PORT/settings/web -d port=$DATABASE_PORT -d username=$USERNAME -d password=$PASSWORD
curl -v http://$LOCALHOST:$DATABASE_PORT/settings/indexes -u $USERNAME:$PASSWORD -d storageMode=memory_optimized

# curl -v -u $USERNAME:$PASSWORD http://$LOCALHOST:$DATABASE_PORT/sampleBuckets/install -d '["travel-sample"]'

# curl -v -u $USERNAME:$PASSWORD http://$LOCALHOST:$DATABASE_PORT/sampleBuckets/install -d '["gamesim-sample"]'

curl -v -u $USERNAME:$PASSWORD http://$LOCALHOST:$DATABASE_PORT/sampleBuckets/install -d '["beer-sample"]'

# Create local-db bucket
# curl -v -X POST -u $USERNAME:$PASSWORD -d 'name=local-db' -d 'ramQuotaMB=100' -d 'authType=none' -d 'proxyPort=11216' "http://$LOCALHOST:$DATABASE_PORT/pools/default/buckets"

fg 1
