FROM node:18.13.0-alpine

WORKDIR /app

# Listening port
ARG PORT=3000
EXPOSE ${PORT}

# Credentials
ARG SIMPLECAST_ACCESS_TOKEN
ARG REVALIDATE_WEBHOOK_TOKEN
ARG STRAPI_API_KEY

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY . .

RUN yarn install --production
RUN yarn build

CMD ["yarn", "start"]
