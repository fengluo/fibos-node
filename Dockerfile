FROM ubuntu:18.04
RUN apt-get update \
    && apt-get install -y curl sudo libssl1.0.0 libusb-1.0-0 libcurl4-gnutls-dev \
    && curl http://security.ubuntu.com/ubuntu/pool/main/i/icu/libicu55_55.1-7_amd64.deb -o libicu55_55.1-7_amd64.deb \
    && dpkg -i libicu55_55.1-7_amd64.deb \
    && rm -rf /var/lib/apt/lists/*
RUN curl -s https://fibos.io/download/installer.sh | sh
WORKDIR /app
COPY . /app/
CMD ["fibos", "index.js"]