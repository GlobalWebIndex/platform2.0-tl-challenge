FROM golang:1.16-alpine

WORKDIR /app

COPY backend/go.mod ./
COPY backend/go.sum ./

RUN go mod download

COPY backend ./

RUN go build -o ./docker-go-gwi

EXPOSE 8080

CMD [ "./docker-go-gwi" ]
