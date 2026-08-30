# PocketBase for FileHog (homelab photo dump)
FROM alpine:3.21

ARG PB_VERSION=0.40.1

RUN apk add --no-cache \
        ca-certificates \
        unzip \
        curl \
        tzdata \
    && update-ca-certificates

ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip

RUN unzip /tmp/pb.zip -d /app/ \
    && chmod +x /app/pocketbase \
    && rm /tmp/pb.zip \
    && mkdir -p /app/pb_data /app/pb_migrations /app/pb_public

WORKDIR /app

COPY docker/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 8090

VOLUME ["/app/pb_data"]

ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["serve", "--http=0.0.0.0:8090"]
