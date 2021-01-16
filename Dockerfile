# ---- Node.js ----
# FROM node:15.5.1-alpine3.10

# WORKDIR /src/frontend
# COPY ./src/frontend/package.json /src/frontend/package.json
# RUN npm install --no-optional && npm cache clean --force

# WORKDIR /src

# ---- Python ----
FROM python:3.7-alpine
LABEL maintainer="garyb9"

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt
RUN apk add --update --no-cache postgresql-client jpeg-dev
RUN apk add --update --no-cache --virtual .tmp-build-deps \
    gcc libc-dev linux-headers postgresql-dev musl-dev zlib zlib-dev
RUN pip install -r /requirements.txt
RUN apk del .tmp-build-deps

RUN mkdir /src
WORKDIR /src
COPY ./src /src


RUN adduser -D user
USER user
