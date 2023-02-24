FROM docker.io/postgres:15-alpine

ENV POSTGRES_USER="develop"
ENV POSTGRES_PASSWORD="develop"
ENV POSTGRES_DB="tattoo"

VOLUME /var/lib/postgresql/data

EXPOSE 5432
