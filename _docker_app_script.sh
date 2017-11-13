#!/usr/bin/env sh

if [ $CONTAINER_TYPE == 'APP' ]; then
  cd src
  python manage.py db upgrade
  uwsgi --socket 0.0.0.0:9000 --protocol http --enable-threads -w app:app
else
  cd src
  python manage.py runworker
fi
