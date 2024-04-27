const express = require('express');
const router = express.Router();
const catQuery = require('../queries/cat.query');
const path = require('path');
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/assets/cat_pfp");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router
  .route("/")
  .get(catQuery.getCats)
  .post(upload.single("image"), catQuery.postCat);
router
    .route('/:catId')
    .get(catQuery.getCat)
    .patch(catQuery.patchCat)
    .delete(catQuery.deleteCat);
router.route('/:catID/:recordName/:recordID')
    .delete(catQuery.deleteRecord)
    .patch(catQuery.editRecord);

module.exports = router;
