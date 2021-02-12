# import urllib3
# http = urllib3.PoolManager()
# r = http.request('GET', 'http://www.google.com')
# # print(r.data)

# from lxml import html

# # We reuse the response from urllib3
# data_string = r.data.decode('utf-8', errors='ignore')
# # We instantiate a tree object from the HTML
# tree = html.fromstring(data_string)
# # We run the XPath against this HTML
# # This returns an array of element
# links = tree.xpath('//a')
# for link in links:
#     # For each element we can easily get back the URL
#     print(link.get('href'))

import requests

r = requests.get('https://www.scrapingninja.co')
print(r.text)