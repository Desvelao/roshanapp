# Roshan App

Webapp created in ReactJS to add feeds and tournaments to Roshan Discord Bot. It shows features about this and the ranking of registered players.

# Development with Docker

```
docker run -itd --rm -v "$(pwd):/home/node/app" -w "/home/node/app" -p 3000:3000 -u node node:10.16.3-stretch-slim
```