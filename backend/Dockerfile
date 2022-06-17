FROM node:16-alpine

WORKDIR /usr/src/app

# install app dependencies
COPY package.json ./
RUN yarn
RUN yarn global add nodemon

COPY --chown=node:node . .

ENV PATH /backend/node_modules/.bin:$PATH

RUN chown -R node:node /usr/src/app/node_modules
USER node

# start app
CMD ["yarn", "start"]
