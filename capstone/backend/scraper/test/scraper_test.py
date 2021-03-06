# Lint as: python3
"""
Tests for scraper.py.
To run: 
First, navigate to step39-2020/capstone/backend/
python3 -m scraper.test.scraper_test
"""

from ..scrapers import scraper
from bs4 import BeautifulSoup
from datetime import datetime
import json
import mock
import requests
import unittest

_FAKE_HTML_BODY_HAS_DATA = '''<html><script id="searchContent" type="application/json"> {
  "searchContent": {
    "preso": {
      "items": [
        {
          "title": "fake"
        }
      ]
    }
  }
}
</script></html>'''
_FAKE_HTML_BODY_NO_DATA = '''<html></html>'''
_FAKE_HTML_RESPONSE = '''<html></html>'''
_FAKE_ITEMS = [ {"title": "fake"} ]

_FAKE_SINGLE_ITEM_INFO_ALL = '''{
  "brand": [
    "LALA"
  ],
  "inventory": {
    "displayFlags": ["OUT_OF_STOCK"]
  },
  "ppu": {
    "amount": 0.101,
    "currencyCode": "USD",
    "unit": "fl oz"
  },
  "primaryOffer": {
    "currencyCode": "USD",
    "offerId": "A96CF1F55C9E412C9DA7B5458635707F",
    "offerPrice": 4.98
  },
  "productId": "7L",
  "seeAllName": "Chocolate Milk",
  "title": "LALA <mark>Milk</mark> Drinks"
}'''

# Some fields omitted, some fields left empty.
_FAKE_SINGLE_ITEM_INFO_EMPTY = '''{
  "brand": [],
  "primaryOffer": {}
}'''

_FAKE_SINGLE_INVENTORY_DICT_ALL = {
  'ItemId': '7L', 
  'ItemAvailability': 'OUT_OF_STOCK', 
  'Price': 4.98, 
  'PPU': 0.101, 
  'Unit': 'fl oz'
}
_FAKE_SINGLE_INVENTORY_DICT_DEFAULT = {
  'ItemId': '', 
  'ItemAvailability': '', 
  'Price': None, 
  'PPU': None, 
  'Unit': ''
}
_FAKE_SINGLE_ITEM_DICT_ALL = {
  'ItemId': '7L', 
  'ItemName':'LALA Milk Drinks', 
  'ItemBrand': 'LALA', 
  'ItemSubtype': 'Chocolate Milk'
  }
_FAKE_SINGLE_ITEM_DICT_DEFAULT = {
  'ItemId': '',
  'ItemName': '',
  'ItemBrand': '',
  'ItemSubtype': ''
}

_FAKE_TARGET_URL = 'http://walmart.fake.com/'

class FakeResponse(object):
  """Fake requests.Response object for requests.get()."""

  def __init__(self, status_code=None, text=None):
    self.status_code = status_code
    self.text = text
    self.content = text.encode('utf8')

  def get_page(self):
    return BeautifulSoup(self.text, 'html.parser')

class ScraperTest(unittest.TestCase):
  @mock.patch.object(requests, 'get')
  def test_get_page(self, mocked_requests_get):
    fake_response = FakeResponse(200, _FAKE_HTML_RESPONSE)
    mocked_requests_get.return_value = fake_response
    soup = scraper.Scraper.get_page(_FAKE_TARGET_URL)
    self.assertEqual(soup, fake_response.get_page())

  def test_get_items(self):
    items = scraper.Scraper.get_items(BeautifulSoup(_FAKE_HTML_BODY_HAS_DATA, 'html.parser'))
    self.assertEqual(items, _FAKE_ITEMS)

  def test_get_no_items(self):
    items = scraper.Scraper.get_items(BeautifulSoup(_FAKE_HTML_BODY_NO_DATA, 'html.parser'))
    self.assertEqual(items, [])

  def test_get_item(self):
    result = scraper.Scraper.get_item_info(json.loads(_FAKE_SINGLE_ITEM_INFO_ALL))
    self.assertEqual(result, _FAKE_SINGLE_ITEM_DICT_ALL)

  def test_get_default_item(self):
    result = scraper.Scraper.get_item_info(json.loads(_FAKE_SINGLE_ITEM_INFO_EMPTY))
    self.assertEqual(result, _FAKE_SINGLE_ITEM_DICT_DEFAULT)

  def test_get_inventory_info(self):
    result = scraper.Scraper.get_inventory_info(json.loads(_FAKE_SINGLE_ITEM_INFO_ALL))
    self.assertEqual(result, _FAKE_SINGLE_INVENTORY_DICT_ALL)

  def test_get_default_inventory_info(self):
    result = scraper.Scraper.get_inventory_info(json.loads(_FAKE_SINGLE_ITEM_INFO_EMPTY))
    self.assertEqual(result, _FAKE_SINGLE_INVENTORY_DICT_DEFAULT)

if __name__ == '__main__':
  unittest.main()
