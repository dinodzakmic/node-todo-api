const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');



// Todo.remove({}).then((result) => {
//    console.log(result); 
// });

// Todo.findOneAndRemove({
//     _id: '59b7e04f199c791e5e24b0e0'
// }).then((todo) => {
//     console.log(todo);
// });

Todo.findByIdAndRemove('59b7e04f199c791e5e24b0e0').then((todo) => {
    console.log(todo);
});