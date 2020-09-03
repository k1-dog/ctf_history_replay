FROM python:3.7-alpine

COPY flag /flag

RUN chmod 655 /flag \
    && addgroup -g 1000 -S ctf \
    && adduser ctf -D -G ctf -u 1000 -s /bin/sh \
    && chmod 4755 /bin/busybox \
    && pip install flask -i https://mirrors.cloud.tencent.com/pypi/simple/

COPY --chown=ctf:ctf app.py /home/ctf

USER ctf
WORKDIR /home/ctf

CMD ["python","/home/ctf/app.py"]