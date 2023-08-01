use("shelly");

// Insert a few documents into the sales collection.
// db.getCollection("device").insertMany([
//   { item: "abc", price: 10, quantity: 2 },
//   { item: "def", price: 7.5, quantity: 10 },
//   { item: "abc", price: 10, quantity: 5 },
// ]);



db.getCollection("device").updateOne({ "_id": ObjectId("64c8013f22ddad7165829e6d") }, 
{
  $set: { 
    quantity: 50}
 });
