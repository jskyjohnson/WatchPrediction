from chronoscraper.items import ChronoscraperItem
import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy.http import Request
from urllib.parse import urlparse
import re
import logging


# Task, Get all the top brands from ('//div[contains(concat(' ',normalize-space(@class),' '),' top-brands')]/a/@href')
# Crawl through each one until https://www.chrono24.com/${BRAND}/index.htm to https://www.chrono24.com/${BRAND}/index-10.htm
# Save it under $BRAND, PRICE, ImageURL
class ChronoCrawl(CrawlSpider):
    name = 'chrono'
    allowed_domains = ['chrono24.com']
    start_urls = ['https://www.chrono24.com/search/browse.htm']

    rules = [
        Rule(LinkExtractor(
            allow='index(-[12345])?.htm', restrict_xpaths='//a[@class="paging-next"]'), callback="parse", follow=True),
        Rule(LinkExtractor(
            allow='index(-[12345])?.htm', restrict_xpaths='//div[@class="top-brands d-flex flex-wrap justify-content-between"]/a'), callback="parse", follow=True)
    ]

    def parse(self, response):
        url = response.request.url
        for watch in response.xpath('//div[@class="article-item-container wt-search-result"]'):
            item = ChronoscraperItem()
            item['brand'] = url.rsplit('/')[-2]
            item['price'] = re.sub("\D", "",  watch.xpath(
                './/div[@class="article-price"]/div/strong/text()[normalize-space()]').get())
            item['imageurl'] = watch.xpath(
                './/div[@class="article-image-container"]/div[@class="content"]/img/@data-original').get()
            if item['imageurl'] and item['price']:
                yield item
