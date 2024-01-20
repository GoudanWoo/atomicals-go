###############################################################################
############## Stage 1: Build the code using a full node image ################
###############################################################################

FROM node:20.10.0-alpine3.19 AS base
LABEL authors="goudanwoo"

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile --network-timeout 1800000
RUN yarn build

###############################################################################
########## Stage 2: Copy over the built code to a leaner image ################
###############################################################################

FROM node:20.10.0-alpine3.19

WORKDIR /app
VOLUME [ "/app/wallets/" ]

COPY --from=base /app/node_modules /app/node_modules
COPY --from=base /app/dist /app/dist
COPY --from=base /app/atomicals-go /app/atomicals-go
COPY --from=base /app/.env.example /app/.env
COPY --from=base /app/package.json /app/package.json

ENTRYPOINT ["node", "dist/cli.js"]
