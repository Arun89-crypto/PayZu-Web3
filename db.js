const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.DB_LINK

const connectToMongo = () => {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('Connected to the mongo database.......')).catch((err) => console.log(err))
}

module.exports = connectToMongo;