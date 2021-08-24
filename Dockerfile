FROM ubuntu:20.04

RUN apt-get update \
    && apt-get install -y nginx

COPY ./dist /var/www
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
ENTRYPOINT ["/usr/sbin/nginx", "-g", "daemon off;"]