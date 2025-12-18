FROM php:8.4-fpm-alpine

RUN apk add --no-cache \
    bash \
    git \
    zip \
    unzip \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    libzip-dev \
    oniguruma-dev \
    icu-dev \
    libxml2-dev \
    mariadb-connector-c-dev

RUN docker-php-ext-configure gd --with-jpeg --with-webp && \
    docker-php-ext-install pdo pdo_mysql intl zip gd

WORKDIR /var/www/html

# Ensure permissions for storage/bootstrap
RUN addgroup -g 1000 laravel && adduser -G laravel -g laravel -s /bin/sh -D laravel && \
    chown -R laravel:laravel /var/www

USER laravel

CMD ["php-fpm"]
