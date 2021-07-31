FROM golang:1.16-buster

COPY . /cowsay

WORKDIR /cowsay

RUN go build -o cowsay

CMD ["/cowsay/cowsay"]
