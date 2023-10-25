const express = require('express')
const router = express.Router()
const diseaseQuery = require('../queries/disease.query')

router.get('/', async (req, res) => {
    try {
        const disease = await diseaseQuery.getDiseases()
        res.status(200).send(disease)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.get('/:diseaseId', async (req, res) => {
    const id = req.params.diseaseId
    try {
        const disease = await diseaseQuery.getDisease(id)
        res.status(200).send(disease)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

module.exports = router
