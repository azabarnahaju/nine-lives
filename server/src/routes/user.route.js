const express = require('express')
const router = express.Router()
const userQuery = require('../queries/user.query')

router.get('/', async (req, res) => {
    try {
        const users = await userQuery.getUsers()
        res.status(200).send(users)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.get('/:userId', async (req, res) => {
    const id = req.params.userId
    try {
        const user = await userQuery.getUser(id)
        console.log(user)
        res.status(200).send(user)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.post('/', async (req, res) => {
    const userData = req.body
    try {
        const newUser = await userQuery.postUser(userData)
        res.status(200).send(newUser)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.patch('/:userId', async (req, res) => {
    const id = req.params.userId
    const userData = req.body
    try {
        const modUser = await userQuery.patchUser(id, userData)
        res.status(200).send(modUser)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.delete('/:userId', async (req, res) => {
    const id = req.params.userId
    try {
        const deletedUser = await userQuery.deleteUser(id)
        res.status(200).send(deletedUser)
    } catch (err) {
        res.status(500).send(err.message)
    }
})
module.exports = router
