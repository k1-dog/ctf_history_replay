
```bash
docker build -t docimg/ctf-2020-wmctf-mpga2 .
docker stop mpga2
docker run -d --rm --name mpga2 -p 80:80 docimg/ctf-2020-wmctf-mpga2
docker exec -it mpga2 /bin/bash
```