# obotix-auth

---
## Response Codes

```
200 OK - Request success and result found
204 No Content - Request success, but NO or ERROR successful results 
301 Moved Permanently - Route moved, send new route
400 Bad Request - Invalid request data sent (Bad data)
401 Unauthorized - No auth or invalid authentication (No credentials)
403 Forbidden - Invalidation authorization (Not enough privileges)
404 Not Found - Non existent ws request (no such endpoint - bad URI)
500 Inter Server Error - Server side errors and issues
503 Service Unavailable - In maintenance mode or overloaded
```

/healthz/live
/healthz/ready
/auth/generate/key
/auth/generate/token
/auth/generate/user/key
/auth/generate/user/token
/auth/user
/auth/user/login
/auth/user/register

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
