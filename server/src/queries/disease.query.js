const DiseaseModel = require('../DB/models/disease.model');
const { isValidObjectId } = require('mongoose');

// @desc    Get diseases
// @route   GET /api/v1/diseases
async function getDiseases(req, res) {
    try {
        const diseases = await DiseaseModel.find();
        if (!diseases) {
            res.status(400);
            throw new Error('Server error');
        } else {
            res.status(200).json(diseases);
        }
    } catch (err) {
        res.json(err.message);
    }
}

// @desc    Get disease
// @route   GET GET /api/v1/diseases/:id
async function getDisease(req, res) {
    const id = req.params.id;
    try {
        if (!isValidObjectId(id)) {
            res.status(400);
            throw new Error('Not a valid id');
        }
        const disease = await DiseaseModel.findOne({ id: id });
        if (!disease) {
            res.status(404);
            throw new Error('Disease not found!');
        } else {
            res.status(200).json(disease);
        }
    } catch (err) {
        res.json(err.message);
    }
}

module.exports = {
    getDiseases,
    getDisease,
};
