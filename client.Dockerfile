FROM node:18-alpine AS medtoolBuilder
LABEL stage=dTrackBuilder

ARG base_url
ENV REACT_APP_SERVER=$base_url

RUN npm update npm -g

COPY ${PWD}/front /front
WORKDIR /front
RUN rm -rfv /front/build
RUN rm -rfv /front/node_modules
RUN npm i
RUN npm run build

FROM nginx:stable-alpine AS medtoolFrontProd
WORKDIR /front
RUN rm /etc/nginx/conf.d/default.conf
COPY ${PWD}/nginx/conf.d /etc/nginx/conf.d
COPY ${PWD}/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=medtoolBuilder /front/build /front
