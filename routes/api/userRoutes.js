const express = require('express');
const router  = express.Router()
const { getUsers, 
        getSingleUser, 
        createUser, 
        updateUser, 
        deleteUser, 
        addFriend, 
        deleteFriend } = require('../../controllers/userController');

router.route('/').get(getUsers).all(createUser);

router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

router.route('/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;