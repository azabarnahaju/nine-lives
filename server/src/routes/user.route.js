const express = require('express');
const router = express.Router();
const userQuery = require('../queries/user.query');

router.route('/').get(userQuery.getUsers).post(userQuery.postUser);
router.route('/:username').get(userQuery.getUser);
router
    .route('/:userId')
    .patch(userQuery.patchUser)
    .delete(userQuery.deleteUser);

module.exports = router;
