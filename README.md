# smtp-pushover

A simple smtp (sendmail) server that forwards all emails to [pushover](https://pushover.net/).

## Why?

It's an easy way to get tools like `smartmontools` to send you push notifications. It can also be handy for quickly scripting push notifications without having to have your pushover credentials all over the place.

## How do I use it?

Docker images are available at [GitHub Container Registry](https://github.com/jpwtck/smtp-pushover/pkgs/container/smtp-pushover).

To use it with `docker-compose`, you could configure it like this:

```yaml
services:
  smtp-pushover:
    restart: unless-stopped
    container_name: smtp-pushover
    image: ghcr.io/jpwtck/smtp-pushover
    ports:
      - "25:25"
    environment:
      - PORT=25 # optional, defaults to 25
      - PUSHOVER_USER=...
      - PUSHOVER_TOKEN=...
```

and start it with

```shell
docker-compose up smtp-pushover
```

Now, if you configure a smtp client to use localhost:25, you can send notifications with:

```shell
echo -e "Subject:Test\n\nHello" | msmtp blah@blah.com
```

### Some details

* The destination email doesn't matter, smtp-pushover will forward all email to pushover.
* The subject of the email becomes the title of the push notification.
* The contents of the email become the text of the push notification.
