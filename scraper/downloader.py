import json
import urllib3
import requests

f = open('../data/watches.json')
data = json.load(f)

for index, watch in enumerate(data):
    url = watch["imageurl"]
    r = requests.get(url)
    with open(f"../data/images/{watch['brand']}-{index}-{watch['price']}.jpg", "wb") as f:
        f.write(r.content)
