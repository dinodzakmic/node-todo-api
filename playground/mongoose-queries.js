const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '59b7988b73a4dc9c1960537b11';

// if(!ObjectId.isValid(id)) {
//     console.log('Id is not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//    console.log('Todos', todos); 
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//    console.log('Todo', todo); 
// });

// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo by id', todo); 
// }).catch((err) => {console.log(err)});

// challenge - query users collection (user.findById and handle three cases)
var userId = '59b6a180ce3996480f36a6ea';
User.findById(userId).then((user) => {
   if(!user) {
       return console.log('User not found');
   } 

   console.log('User by id', user);
}, (err) => console.log(err));