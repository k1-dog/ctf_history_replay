#!/bin/sh

sed -i 's/register_argc_argv = Off/register_argc_argv = On/g' /usr/local/etc/php/php.ini
rm -rf /config.sh