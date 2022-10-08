# obotix-auth

---
## Docker
```bash
docker build --build-arg env_target=PROD -t obotix-api:0.1.0 .
docker build -t obotix-api:0.1.0 .
docker images
docker image tag d7fc432c2739 obotix-api:latest
docker run -it obotix-api sh
#             Local:Pod
docker run -d -p 80:3000 --name oapi obotix-api npm start
docker ps
docker exec oapi ls
docker stop oapi
docker ps -a
docker start oapi
docker rm -f oapi
```
