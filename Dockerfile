FROM ubuntu:18.04
RUN apt-get update \
    && apt-get install -y curl sudo libssl1.0.0 libusb-1.0-0 libcurl3-gnutls \
    && rm -rf /var/lib/apt/lists/*
RUN curl -s https://fibos.io/download/installer.sh | sh
CMD ["fibos", "index.js"]