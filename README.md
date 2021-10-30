# discord-cowsay

Startup:
```
docker run -d -v /etc/letsencrypt/live/cowsay.yoinks.org/privkey.pem:/certs/privkey.pem -v /etc/letsencrypt/live/cowsay.yoinks.org/fullchain.pem:/certs/fullchain.pem -p 443:443 -e SSL_CERT=/certs/fullchain.pem -e SSL_KEY=/certs/privkey.pem -e DISCORD_PUBLIC_KEY=33ec5fa8fa1982bb3d5be20d6c132cda04777ec4b587dce09c37bcbc805f337b --name cowsay discord-cowsay
```
