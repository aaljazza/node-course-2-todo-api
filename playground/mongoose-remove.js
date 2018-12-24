const { ObjectID } = require("mongodb");

const { mongoose } = require("../server/db/mongoose");
const { Todo } = require("../server/models/todo");
const { User } = require("../server/models/user");

// Todo.remove({}).then(result => {
//   console.log(result);
// });

// Todo.findOneAndRemove()
Todo.findByIdAndRemove("5c21167e7941aaa1e4c2e21b").then(todo => {
  console.log(todo);
});
