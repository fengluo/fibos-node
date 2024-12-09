FROM ubuntu:24.04
RUN apt-get update \
    && apt-get install -y curl sudo \
    && rm -rf /var/lib/apt/lists/*
RUN curl -s https://fibos.io/download/installer.sh | sh
WORKDIR /app
COPY . /app/
CMD ["fibos", "index.js"]