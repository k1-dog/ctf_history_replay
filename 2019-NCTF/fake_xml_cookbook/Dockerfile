FROM php:7.4-rc-alpine

COPY osrc /var/www/html/
COPY flag /flag

WORKDIR /var/www/html

CMD ["php", "-S", "0.0.0.0:80", "-t", "/var/www/html/"]