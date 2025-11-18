# Builder
FROM golang:latest AS builder
WORKDIR /app

COPY go.mod go.sum .
RUN go mod download 

COPY . .
RUN GOOS=linux go build -o main cmd/main.go 

# Runner
FROM ubuntu:latest
WORKDIR /app

COPY --from=builder /app/main .
CMD ["./main"]
