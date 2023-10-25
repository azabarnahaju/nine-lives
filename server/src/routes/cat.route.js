const express = require('express')
const router = express.Router()
const catQuery = require('../queries/cat.query')

router.get('/', async (req, res) => {
    try {
        const cats = await catQuery.getCats()
        res.status(200).send(cats)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.get('/:catId', async (req, res) => {
    const id = req.params.catId
    try {
        const cat = await catQuery.getCat(id)
        res.status(200).send(cat)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.post('/', async (req, res) => {
    const catData = req.body
    try {
        const newCat = await catQuery.postCat(catData)
        res.status(200).send(newCat)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.patch('/:catId', async (req, res) => {
    const id = req.params.catId
    const catData = req.body
    try {
        const modCat = await catQuery.patchUser(id, catData)
        res.status(200).send(modCat)
    } catch (err) {
        res.status(500).send(err.message)
    }
})
router.delete('/:catId', async (req, res) => {
    const id = req.params.catId
    try {
        const deletedCat = await catQuery.deleteCat(id)
        res.status(200).send(deletedCat)
    } catch (err) {
        res.status(500).send(err.message)
    }
})
module.exports = router
