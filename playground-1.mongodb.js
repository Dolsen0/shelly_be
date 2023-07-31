use('shelly');

// Insert a few documents into the sales collection.
db.getCollection('device').insertMany([
  { 'item': 'abc', 'price': 10, 'quantity': 2 },
  { 'item': 'def', 'price': 7.5, 'quantity': 10 },
  { 'item': 'abc', 'price`': 10, 'quantity': 5 },
]);
