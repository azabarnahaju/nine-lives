const mongoose = require('mongoose')

const DiseaseSchema = mongoose.Schema({
    id: String,
    name: String,
    symptoms: Array,
    breed:Array,
})

const DiseaseModel = mongoose.model('Disease', DiseaseSchema)

module.exports = DiseaseModel
