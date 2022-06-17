FROM node:16-alpine

WORKDIR /usr/src/app

# install app dependencies
COPY package*.json ./
RUN yarn

COPY --chown=node:node . .

RUN chown -R node /usr/src/app/node_modules
USER node

# start app
CMD ["yarn", "start"]
