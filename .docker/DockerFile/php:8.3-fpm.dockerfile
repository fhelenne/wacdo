FROM php:8.3-fpm

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php -r "if (hash_file('sha384', 'composer-setup.php') === 'dac665fdc30fdd8ec78b38b9800061b4150413ff2e3b6f88543c636f7cd84f6db9189d43a81e5503cda447da73c7e5b6') { echo 'Installer verified'.PHP_EOL; } else { echo 'Installer corrupt'.PHP_EOL; unlink('composer-setup.php'); exit(1); }"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer

RUN apt-get update && \
    apt-get upgrade -y
RUN apt-get install -y zip
RUN apt-get install -y git

RUN curl -sS https://get.symfony.com/cli/installer | bash
RUN mv /root/.symfony5/bin/symfony /usr/local/bin/symfony

RUN docker-php-ext-install  mysqli
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install bcmath

# Installer Xdebug
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug




