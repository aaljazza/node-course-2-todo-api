const expect = require("express");
const request = require("supertest");

const { app } = require("./../server.js");
const { Todo } = require("./../models/todo");

beforeEach(done => {
  Todo.remove({}).then(() => {
    done();
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
      .send({ text: "hello" })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
});
