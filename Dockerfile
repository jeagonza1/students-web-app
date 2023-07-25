# Stage 0, "build", based on Node.js, to build and compile the frontend
FROM node:19-slim as build

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm ci

COPY . .

ARG BUILD_ENV

RUN echo "BUILD_ENV: " $BUILD_ENV

RUN npm run-script $BUILD_ENV

RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.25.1-alpine
COPY /nginx-conf/default.conf /etc/nginx/conf.d/
COPY /usr/src/app/build/ /usr/share/nginx/html

EXPOSE 3000
