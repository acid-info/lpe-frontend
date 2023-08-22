FROM node:18.13.0-alpine 

EXPOSE 3000
WORKDIR /usr/src/app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY yarn.lock .
COPY package.json .

RUN yarn install 

COPY . . 

RUN yarn build

CMD yarn start
