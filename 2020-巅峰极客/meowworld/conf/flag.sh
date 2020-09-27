#!/bin/sh

echo $FLAG > /flag

chmod 440 /flag
chmod 555 /readflag

rm -rf /flag.sh