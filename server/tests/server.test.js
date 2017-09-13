const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    text: 'First test todo',
    _id: new ObjectId()
}, {
    text: 'Second test todo',
    _id: new ObjectId(),
    completed: true,
    completedAt: 333
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos);
    }).then(() => done());
});


describe('POST /todos', () => {
    it('should create new todo', (done) => {
        var text = 'Test todo text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text)
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
        .post('/todos')
        .send({text: ''})
        .expect(400)
        .end((err, res) => {
           if(err) {
               return done(err);
           }
           
           Todo.find().then((todos) => {
               expect(todos.length).toBe(2);
               done();
           }).catch((e) => done(e));
        });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
       request(app)
       .get('/todos')
       .expect(200)
       .expect((res) => {
           expect(res.body.todos.length).toBe(2);
       })
       .end(done)
    });
 });

 describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done)
    });

    it('should return 404 if todo not found', (done) => {
        request(app)
        .get(`/todos/${new ObjectId()}`)
        .expect(404)
        .end(done)
    });

    it('should return 404 for non-object ids ', (done) => {
        request(app)
        .get('/todos/123')
        .expect(404)
        .end(done)
    });
 });

 describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        console.log(todos);
        var hexId = todos[0]._id.toHexString();

       request(app)
       .delete(`/todos/${hexId}`)
       .expect(200)
       .expect((res) => {
            expect(res.body.todo._id).toBe(hexId);
       })
       .end((err, res) => {
           if(err) {
               return done(err);
           }

           Todo.findById(hexId).then((todo) => {
                expect(todo).toNotExist();
                done();
           }).catch((e) => done(e));
       });
    });

    it('should return 404 if todo not found', (done) => {
        request(app)
        .delete(`/todos/${new ObjectId()}`)
        .expect(404)
        .end(done)
    });

    it('should return 404 if object id is invalid', (done) => {
        request(app)
        .delete('/todos/123')
        .expect(404)
        .end(done)
    });
 });


describe('PATCH /todos/:id', () => {
   it('should update the todo', (done) => {
        var newText = 'Testing patch 1';
        //get id of first item
        var hexId = todos[0]._id.toHexString(); 
        //make PATCH request
        request(app) 
        .patch(`/todos/${hexId}`)
        //update text, set completed to true
        .send({
            text: newText,
            completed: true
        })
        //assert for 200, custom assert for res.body.text = sentText     
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(newText);
        })
        //assert that completed is true, completedAt is number toBeA
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.findById(hexId).then((todo) => {
                expect(todo.completed).toBe(true);
                expect(todo.completedAt).toBeA('number');
                expect(todo.text).toBe(newText);
                done();
            }).catch((e) => done(e));
        }); 
   });
   
   it('should clear completedAt when todo is not completed', (done) => {
        var newText = 'Testing patch 2';
        //get id of second todo item
        var hexId = todos[1]._id.toHexString();
        //update text, set completed to false
        request(app)
        .patch(`/todos/${hexId}`)
        .send({
            text: newText,
            completed: false
        })
        //assert for 200, res.body.text = sentText
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(newText);
        })
        //assert text changed, completed false, completedAt null toNotExist
        .end((err, res) => {
            if(err) {
                return done(err);
            }

            Todo.findById(hexId).then((todo) => {
                expect(todo.text).toBe(newText);
                expect(todo.completed).toBe(false);
                expect(todo.completedAt).toNotExist();
                done();
            }).catch((e) => done(e));
        });
   });
});

