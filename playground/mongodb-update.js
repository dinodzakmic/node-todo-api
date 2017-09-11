const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('59b2717d2d21e4432865c2c4'
    // )}, {
    //     $set:{ 
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // }); //using update operators


    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('59b2a8ccb649974612191fad')
    }, {
        $inc:{ 
            age: 4
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    }); 


    //db.close();
});