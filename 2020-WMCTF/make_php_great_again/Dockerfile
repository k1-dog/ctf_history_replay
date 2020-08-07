FROM php:7.4.9-apache

COPY src /var/www/html

RUN mv /usr/local/etc/php/php.ini-production /usr/local/etc/php/php.ini && \
    sed -i 's/;session.upload_progress.enabled = On/session.upload_progress.enabled = Off/g' /usr/local/etc/php/php.ini && \
    sed -i 's/error_reporting = E_ALL & ~E_DEPRECATED & ~E_STRICT/error_reporting = true/g' /usr/local/etc/php/php.ini
