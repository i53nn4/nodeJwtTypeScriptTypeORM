# pull the official base image
FROM node:18.2.0-alpine

# set your working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# fix permissions for packages
RUN npm config set unsafe-perm true

# install application dependencies
COPY package.json ./
RUN npm install --silent

# add app
COPY . ./

# add permission
RUN chown -R node /app/node_modules
USER node
