##------------------------------------- METADATA -------------------------------------

FROM php:8.1.1-fpm-buster

####################  TOOLS  ####################

# Install some utility toolstools
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip\
    msmtp

## Default user
RUN usermod -u 1000 www-data \
    && groupmod -g 1000 www-data

####################  PHP  ####################

# Copy this amazing tools
COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/bin/

# Allow use of previous stable linux image in case a new version became the default
RUN apt-get update --allow-releaseinfo-change

# Add some PHP extensions
RUN install-php-extensions \
    bcmath \
    gd \
    imagick \
    intl \
    opcache \
    pdo_mysql \
    exif \
    pcntl \
    soap \
    sockets \
    xsl \
    zip

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Configure composer
ENV COMPOSER_MEMORY_LIMIT=-1
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV COMPOSER_HOME=/tmp

COPY $DOCKER/docker/php/php.ini /usr/local/etc/php/php.ini
# Configure smpt
COPY $DOCKER/docker/php/msmtprc /etc/msmtprc

####################  CLEANING & FINALISE  ####################
RUN rm -rf /tmp/* /var/list/apt/* \
    && apt-get clean -y && apt-get autoclean -y && apt-get autoremove -y

## Default User
USER www-data

EXPOSE 9000
