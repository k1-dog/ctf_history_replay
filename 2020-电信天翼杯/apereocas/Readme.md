
```bash
docker build -t docimg/ctf-2020-dxty-apereocas .
docker run -d --rm --name apereocas -p 8080:8080 docimg/ctf-2020-dxty-apereocas
docker stop apereocas
docker exec -it apereocas /bin/bash
```