const expect = require("express");
const request = require("supertest");
const { ObjectID } = require("mongodb");

const { app } = require("./../server.js");
const { Todo } = require("./../models/todo");

const todos = [
  {
    _id: new ObjectID(),
    text: "first test todo"
  },
  {
    _id: new ObjectID(),
    text: "second test todo"
  }
];

beforeEach(done => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos).then(() => done());
  });
});

describe("POST /todos", () => {
  it("should create a new todo", done => {
    var text = "Test todo text";

    request(app)
      .post("/todos")
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find()
          .then(todos => {
            //expect(todos.length).toBe(1);
            //expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => done(e));
      });
  });

  it("should not create todo with invalid body data", done => {
    request(app)
      .post("/todos")
      .send({ text: "" })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find()
          .then(todos => {
            expect(todos.length) === 2;
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe("GET /todos", () => {
  it("should get all todos", done => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length) === 0;
      })
      .end(done);
  });
});

describe("GET /todos/:id", () => {
  it("Should return todo doc", done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        res.body.todo.text === todos[0].text;
      })
      .end(done);
  });

  it("Should return a 404 if todo not found", done => {
    var id2 = new ObjectID().toHexString;
    request(app)
      .get(`/todos/${id2}`)
      .expect(404)
      .end(done);
  });

  it("Should return a 404 if id is false", done => {
    var id3 = 123;
    request(app)
      .get(`/todos/${id3}`)
      .expect(404)
      .end(done);
  });
});

describe("DELETE /todos/:id", () => {
  it("should remove a todo", done => {
    var hexID = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexID}`)
      .expect(200)
      .expect(res => {
        //expect(res.body.todo._id === hexID);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(hexID).then(todo => {
          //expect(!todo);
          done();
        });
        done();
      });
  });

  it("should return 404 if todo not found", done => {
    var hexID = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexID}`)
      .expect(404)
      .expect(res => {
        expect(res.body.todo._id === hexID);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(hexID).then(todo => {
          expect(!todo);
          done();
        });
        done();
      });
  });

  it("should return 404 if Object ID is invalid", done => {
    var hexID = 123;

    request(app)
      .delete(`/todos/${hexID}`)
      .expect(404)
      .expect(res => {
        expect(res.body.todo._id === hexID);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(hexID).then(todo => {
          expect(!todo);
          done();
        });
        done();
      });
  });
});
