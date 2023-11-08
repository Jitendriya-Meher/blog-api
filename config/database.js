
const mongoose = require('mongoose');

require("dotenv").config();

const connectWithDB = () => {

mongoose.connect( process.env.DATABASE_URL , {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( console.log("DB connection established .. !!"))
.catch( (err) => {
    console.log("DB Facing Connection Error Issue");
    console.log(err);
    // process.exit(1);
});

};

module.exports = connectWithDB;