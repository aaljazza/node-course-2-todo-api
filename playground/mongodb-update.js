// const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  (err, client) => {
    if (err) {
      return console.log("We were unable to connect to the MongoDB server");
    }
    console.log("Connected to MongoDB Server");

    const db = client.db("TodoApp");

    // findOneAndUpdate
    db.collection("Users")
      .findOneAndUpdate(
        { _id: ObjectID("5c1fc7673a470444445f64c7") },
        {
          $inc: { age: 2 },
          $set: { name: "Aj21" }
        },
        {
          returnOriginal: false
        }
      )
      .then(result => console.log(result));

    // db.close()
  }
);
