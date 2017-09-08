const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');

    //deleteMany
    // db.collection('Todos').deleteMany({text: 'Call Deni'}).then((result) => {
    //     console.log('Using deleteMany');
    //     console.log(result);
    // });

    //deleteOne
    // db.collection('Todos').deleteOne({text: 'Call Deni'}).then((result) => {
    //     console.log('Using deleteOne');
    //     console.log(result);
    // });

    //findOneAndDelete - favorite
    // db.collection('Todos').findOneAndDelete({text: 'Call Deni'}).then((result) => {
    //    console.log('Using findOneAndDelete');
    //    console.log(result); 
    // });


    //EXERCISE
    // db.collection('Users').deleteMany({name: 'Dino'}).then((result) => {
    //     console.log('Deleting all users with name Dino');
    // })

    db.collection('Users').findOneAndDelete({_id: 124}).then((result) => {
        console.log('Deleting one user with ID 124');
        console.log(result.value);
    })


    //db.close();
});