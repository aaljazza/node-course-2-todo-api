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

    // db.collection("Users")
    //   .deleteMany({ name: "Abdulla" })
    //   .then(result => {
    //     console.log(result);
    //   });

    db.collection("Users")
      .findOneAndDelete(ObjectID("5c1f9d6045141b4528370f25"))
      .then(result => {
        console.log(result);
      });

    // deleteMany
    // db.collection("Todos")
    //   .deleteMany({ text: "Eat Lunch" })
    //   .then(
    //     result => {
    //       console.log(result);
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );

    // deleteOne
    // db.collection("Todos")
    //   .deleteOne({
    //     text: "Eat Lunch"
    //   })
    //   .then(
    //     result => {
    //       console.log(result);
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );

    // findOneAndDelete
    // db.collection("Todos")
    //   .findOneAndDelete({
    //     completed: false
    //   })
    //   .then(
    //     result => {
    //       console.log(result);
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );

    // db.close()
  }
);
