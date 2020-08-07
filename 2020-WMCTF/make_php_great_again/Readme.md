
```bash
docker build -t docimg/ctf-2020-wmctf-mpga .
docker stop mpga
docker run -d --rm --name mpga -p 8080:8080 docimg/ctf-2020-wmctf-mpga
docker exec -it mpga /bin/bash
```