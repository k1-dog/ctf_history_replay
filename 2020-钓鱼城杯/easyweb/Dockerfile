FROM php:7.4.9-apache-buster

COPY index.php /var/www/html
COPY flag.txt /

RUN chown -R root:root /var/www/html/ \
    && chmod -R 755 /var/www/html/ \
    && chmod 644 /flag.txt
