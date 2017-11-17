#!/usr/bin/env bash

REPOSITORY_URI=[PUT YOUR REPOSITORY URI HERE]

npm run build

docker build -t server .
docker build -t proxy ./proxy

eval $(aws ecr get-login --no-include-email --region [PUT YOUR REGION HERE] --profile ECS);

docker tag proxy:latest $REPOSITORY_URI:proxy
docker push $REPOSITORY_URI:proxy

docker tag server:latest $REPOSITORY_URI:server
docker push $REPOSITORY_URI:server
