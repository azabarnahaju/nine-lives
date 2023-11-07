const express = require('express');
const router = express.Router();
const userQuery = require('../queries/user.query');

router.route('/').get(userQuery.getUsers).post(userQuery.postUser);
router.route("/:username/:password").get(userQuery.getUserLogin);
router
    .route('/:userId')
    .get(userQuery.getUser)
    .patch(userQuery.patchUser)
    .delete(userQuery.deleteUser);

module.exports = router;
