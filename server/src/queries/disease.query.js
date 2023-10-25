const DiseaseModel = require('../DB/models/disease.model')

async function getDiseases() {
    try {
        const disease = await DiseaseModel.find()
        return disease
    } catch (err) {
        console.log(err.message)
    }
}
async function getDisease(id) {
    try {
        const disease = await DiseaseModel.findOne({ id: id })
        return disease
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = {
    getDiseases,
    getDisease,
}
