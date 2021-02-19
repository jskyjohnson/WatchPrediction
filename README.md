Simple Readme

## Web Scraper
TO RUN WEB SCRAPER
* `scrapy crawl chrono -O ../../data/watches.json` from inside /scraper/chronoscraper
* then run `python downloader.py`

## Perceptilabs
You might run into an issue with PEMHTTPD service running on port 8080 when trying to start `perceptilabs`,
Do a netstat -aon | findstr 8080 to check for the PID then shut it down...
