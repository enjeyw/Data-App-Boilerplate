FROM python:3.6-alpine

RUN apk update \
  && apk add gcc g++ libffi libffi-dev libstdc++ python3-dev musl-dev \
  && apk add postgresql-dev

RUN pip install numpy==1.13.1 pandas==0.20.3

RUN apk add linux-headers

COPY ./requirements.txt /
RUN pip install -r requirements.txt

ADD ./server /src/server
ADD ./migrations /src/migrations
ADD ./config_files /src/config_files
ADD ./config.py /src
ADD ./manage.py /src
ADD ./_docker_app_script.sh /

WORKDIR /

RUN chmod +x /_docker_app_script.sh

EXPOSE 9000

CMD ["/_docker_app_script.sh"]