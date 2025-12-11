const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(() => {
    console.error('Error connecting to MongoDB');
});

const loginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = mongoose.model('users', loginSchema);

module.exports = collection;
