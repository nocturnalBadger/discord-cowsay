FROM golang:1.16-buster

LABEL org.opencontainers.image.source=https://github.com/nocturnalBadger/discord-cowsay

COPY . /cowsay

WORKDIR /cowsay

RUN go build -o cowsay

CMD ["/cowsay/cowsay"]
