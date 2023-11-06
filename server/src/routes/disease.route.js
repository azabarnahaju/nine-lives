const express = require('express');
const router = express.Router();
const diseaseQuery = require('../queries/disease.query');

router.route('/').get(diseaseQuery.getDiseases);
router.route('/:diseaseId').get(diseaseQuery.getDiseases);

module.exports = router;
