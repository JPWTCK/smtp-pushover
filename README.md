# smtp-pushover

A tiny SMTP (sendmail) server that forwards incoming mail to [Pushover](https://pushover.net/).

## Why?

It’s an easy way to get tools like `smartmontools`, `monit`, cron jobs, or simple scripts to send you push notifications without sprinkling Pushover creds everywhere.

## Quick start

Docker images are published to GitHub Container Registry:  
`ghcr.io/jpwtck/smtp-pushover:latest`

### Docker Compose

```yaml
services:
  smtp-pushover:
    restart: unless-stopped
    image: ghcr.io/jpwtck/smtp-pushover:latest
    # Map host 2525 -> container 25 so you don't need root on the host
    ports:
      - target: 25
        published: 2525
        protocol: tcp
        mode: host
    environment:
      - PORT=25                            # optional (default 25)
      - PUSHOVER_USER=${PUSHOVER_USER}     # put values in .env
      - PUSHOVER_TOKEN=${PUSHOVER_TOKEN}
      # Comma-separated, case-insensitive substrings to ignore
      - IGNORE_SUBJECT_LITERAL=Monit alert instance,Monit alert started,Monit alert stopped
    healthcheck:
      test: ["CMD", "nc", "-z", "localhost", "25"]
      interval: 10s
      timeout: 2s
      retries: 5
