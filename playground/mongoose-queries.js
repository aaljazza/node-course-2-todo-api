const { ObjectID } = require("mongodb");

const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");

// var id = "5c20faa9e6894c4fb138553b";
var userID = "5c20e5523ee93749fa36a8db";
// if (!ObjectID.isValid(id)) {
//   return console.log("ID is not valid, fix it!");
// }

// if (!ObjectID.isValid(userID)) {
//   return console.log("User ID is not Valid. Write in a Valid User ID!");
// }

// User.find({
//   _id: userID
// }).then(user => console.log(`User Email: ${user}`));

// User.findOne({
//   _id: userID
// }).then(user => console.log(`User Email: ${user}`));

User.findById(userID).then(
  user => {
    if (!user) {
      return console.log("User ID not Found");
    }
    return console.log(`User by ID: ${user}`);
  },
  e => {
    console.log(e);
  }
);

// Todo.find({
//   _id: id
// }).then(todos => {
//   console.log(`Todos: ${todos}`);
// });

// Todo.findOne({
//   _id: id
// }).then(todo => {
//   console.log(`Todo: ${todo}`);
// });

// Todo.findById(id)
//   .then(todo => {
//     if (!todo) {
//       return console.log("ID not Found!!!");
//     }
//     console.log(`Todo By ID: ${todo}`);
//   })
//   .catch(e => console.log(e));
