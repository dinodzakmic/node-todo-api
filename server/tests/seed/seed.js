const {ObjectId} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectId();
const userTwoId = new ObjectId();
const users = [{
    _id: userOneId,
    email: 'userOne@mail.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]}, {
    _id: userTwoId,
    email: 'userTwo@mail.com',
    password: 'userTwoPass',
}];

const todos = [{
    text: 'First test todo',    
    _id: new ObjectId()
}, {
    text: 'Second test todo',
    _id: new ObjectId(),
    completed: true,
    completedAt: new Date().toISOString()
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
      var userOne = new User(users[0]).save();
      var userTwo = new User(users[1]).save();

      Promise.all([userOne, userTwo]);
  }).then(() => done());
};

module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
};