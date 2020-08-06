
```bash
docker build -t docimg/ctf-2020-dxty-apitest .
docker run -d --rm --name apitest -p 8080:8080 docimg/ctf-2020-dxty-apitest
docker stop apitest
```