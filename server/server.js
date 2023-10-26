const express = require('express');
const mongoose = require('mongoose');
const {
    parsed: { MONGO_URL },
} = require('dotenv').config();
const app = express();

const PORT = '4000';
const catRouter = require('./src/routes/cat.route');
const userRouter = require('./src/routes/user.route');
const diseaseRouter = require('./src/routes/disease.route');

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

app.use('/api/v1/cats', catRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/diseases', diseaseRouter);

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
