# fill in the blanks to dockerize this node app
FROM node:10.15-alpine
# install nodemon as global
RUN npm install --verbose -g nodemon
# defines the directory where the app will be
WORKDIR /app
# copy package.json and lock file (if it exists) to the working dir
COPY package.json package-lock*.json ./
# install npm dependencies, showing all libs installed to help in cases of
# some kind of probems and removing cache to help building a smaller image
RUN npm i \
  && npm list \
  && npm cache clean --force
# copy app content to the container's working dir
COPY . .
# runs the app inside the container
# Exposes port 3000 based on app's used port
EXPOSE 3000

CMD ["node", "index.js"]