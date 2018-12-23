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

    // db.collection("Todos").insertOne(
    //   {
    //     text: "Something to do",
    //     completed: false
    //   },
    //   (err, result) => {
    //     if (err) {
    //       return console.log("Unable to insert todo: ", err);
    //     }
    //     console.log(
    //       "Successfully Added:",
    //       JSON.stringify(result.ops, undefined, 2)
    //     );
    //   }
    // );

    // insert new doc into Users Collectin (name, age, location)

    db.collection("Users").insertOne(
      {
        name: "Abdulla",
        age: 28,
        location: "Rawda Kuwait"
      },
      (err, result) => {
        if (err) {
          return console.log("Unable to insert user:", err);
        }
        console.log(
          `Successfully Added: ${JSON.stringify(result.ops, undefined, 2)}`
        );
        console.log(result.ops[0]._id.getTimestamp());
      }
    );

    client.close();
  }
);
