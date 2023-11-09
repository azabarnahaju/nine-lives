const express = require('express');
const router = express.Router();
const catQuery = require('../queries/cat.query');

router.route('/').get(catQuery.getCats).post(catQuery.postCat);
router
    .route('/:catId')
    .get(catQuery.getCat)
    .patch(catQuery.patchCat)
    .delete(catQuery.deleteCat);
router.route('/:catID/:recordName/:recordID')
    .delete(catQuery.deleteRecord);

module.exports = router;
