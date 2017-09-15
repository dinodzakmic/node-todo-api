const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'Password1';
var hashedPassword;
// salt
bcrypt.genSalt(10, (err, salt) => {
   //hash
   bcrypt.hash(password, salt, (err, hash) => {
        hashedPassword = hash;
        console.log(hash); 
   });
});

//compare
setTimeout(() => {
    bcrypt.compare(password, hashedPassword, (err, res) => {
        console.log(res);
    });
}, 2000);


// var data = {
//     id: 10
// };

// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded)

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);



// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// token.data.id = 5;
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if(resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed. Do not trust');
// }

