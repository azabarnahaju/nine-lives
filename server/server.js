const express = require('express');
const mongoose = require('mongoose');
const {
    parsed: { MONGO_URL },
} = require('dotenv').config();
const app = express();
const PORT = '4000';
const { errorHandler } = require('./src/middlewares/error.middleware');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT,PATCH, DELETE');
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

app.use('/api/v1/cats', require('./src/routes/cat.route'));
app.use('/api/v1/users', require('./src/routes/user.route'));
app.use('/api/v1/diseases', require('./src/routes/disease.route'));

async function main() {
    try {
        await mongoose.connect(MONGO_URL);

        app.listen(PORT, () => {
            console.log('Server is listening on http://localhost:4000');
        });
    } catch (err) {
        console.log(err);
    }
}

main();
