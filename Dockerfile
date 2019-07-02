## Stage 1 - Production base
# install the production dependencies
FROM node:10.15-alpine as base
# runs the app inside the container
# Exposes port 3000 based on app's used port
EXPOSE 3000
# Se node environment to production
ENV NODE_ENV=production
# move to the dir where the node moduels will be installed
WORKDIR /opt
# copy package.json and lock file (if it exists) to the working dir
COPY package.json package-lock*.json ./
# install npm dependencies for prod and remove cache
# to help building a smaller image.
# It will initially logs configs that could
# be checked to see if everything was fine before install.
RUN npm config list \
  && npm ci \
  && npm cache clean --force

## Stage 2 - Development
# Uses the base as starting point.
# There's no copy in this stage. We'll use bind-mounting
# in the compose file.
FROM base as dev
# set node env to development
ENV NODE_ENV=development
# Put binary node modules into the System Path.
# Ex.: to use nodemon
ENV PATH=/opt/node_modules/.bin:$PATH
# move to the dir where the node moduels will be installed
WORKDIR /opt
# install only development node modules
RUN npm i --only=development
# Set the app working dir in a level below the
# node modules installed dependencies
WORKDIR /opt/app
# Run the app using nodemon
CMD ["nodemon", "./bin/www", "--inspect=0.0.0.0:9229"]

## Stage 3 - Copy in source code
# An intermediate stage to just copy the source code in
# for future stages
# Still uses base as starting point
FROM base as source
# Set the app working dir in a level below the
# node modules installed dependencies
WORKDIR /opt/app

COPY . ./

## Stage 4 - Testing
# For use with CI servers
# has prod and dev dependencies
FROM source as test
# set node env to development
ENV NODE_ENV=development
# Put binary node modules into the System Path.
# Ex.: to use nodemon
ENV PATH=/opt/node_modules/.bin:$PATH
# Copy prod and dev dependencies
# Files will be copyied from dev image
COPY --from=dev /opt/node_modules /opt/node_modules
# Ans now we can run our test pipeline
# Linting
RUN eslint .
# Tests
RUN npm test
# And other tests, like integration
# to run with docker-compose
CMD ["npm", "run", "int-test"]

## Stage 5 - Production
# It's the default stage
# Only production dependencies
FROM source as prod
# Look! No nodemon here!!!
CMD ["node", ".bin/www"]