# pull the official base image
FROM node:16-alpine

# set your working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install application dependencies
COPY package.json ./
RUN npm install --silent

# add app
COPY . ./
