FROM node:16.16-bullseye

RUN apt-get update \
  && apt-get install -y curl \
  && apt-get clean

WORKDIR /opt/app

COPY . .

RUN yarn install

ENTRYPOINT [ "yarn", "start" ]