const express = require("express");
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');

const url = 'mongodb+srv://ivankhutso:Ivan95Keys@cluster0.cvbjhuh.mongodb.net/LoanCalculatorDb?retryWrites=true&w=majority'
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    next();
});

const route_server = require('./routes/server')
app.use('/server', route_server)

async function connect() {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error(error);
    }
}

connect();
app.listen(8000, () => {
    console.log("Server started on port 8000")
});

module.exports = app;
