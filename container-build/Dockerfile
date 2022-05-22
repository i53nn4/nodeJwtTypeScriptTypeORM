# pull the official base image
FROM node:18.2.0-alpine

# set your working directory
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# fix permissions for packages
RUN npm config set unsafe-perm true

# install application dependencies
COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]
RUN npm install --silent

# add app
COPY ./src ./src

# add permission
RUN chown -R node /usr/src/app/node_modules
USER node
