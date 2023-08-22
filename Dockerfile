FROM node:18.13.0-alpine 

WORKDIR /usr/src/app

ENV PORT 3000
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE ${PORT} 

COPY yarn.lock .
COPY package.json .

RUN yarn install 

COPY . . 

RUN yarn build

CMD yarn start
