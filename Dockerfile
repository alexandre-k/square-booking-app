# get the base node image
FROM node:alpine

# set working directory
WORKDIR /frontend

# add `/app/node_modules/.bin` to $PATH
ENV PATH /frontend/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./frontend
RUN yarn
COPY . .

# start app
CMD ["yarn", "start"]
