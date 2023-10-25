const express = require('express')
const mongoose = require('mongoose')
const {
    parsed: { MONGO_URL },
} = require('dotenv').config()
const app = express()

const PORT = '4000'
const catRouter = require('./src/routes/cat.route')
const userRouter = require('./src/routes/user.route')
const diseaseRouter = require('./src/routes/disease.route')

app.use(express.json())

app.get('/', (req, res) => {
    res.send('I am working')
})

// GET, POST, PATCH, REMOVE => /api/v1/users users/:id
// GET, POST, PATCH, REMOVE => cats, cats/:id
// GET => disease

app.use('/api/v1/cats', catRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/diseases',diseaseRouter)

async function main() {
    try {
        await mongoose.connect(MONGO_URL)

        app.listen(PORT, () => {
            console.log('Server is listening on http://localhost:4000')
        })
    } catch (err) {
        console.log(err)
    }
}

main()
