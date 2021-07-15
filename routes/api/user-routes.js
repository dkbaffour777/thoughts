const router = require('express').Router();
// api/users
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../../controllers/user-controller');


// /api/users/:userId/friends/:friendId
const {
  createFriend,
  deleteFriend
} = require('../../controllers/friend-controller');


// Set up GET all and POST at /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// Set up GET all and POST at /api/users/:userId/friends/:friendId
router
  .route('/:userId/friends/:friendId')
  .post(createFriend);

// Set up GET one, PUT, and DELETE at /api/users/:userId/friends/:friendId
router
  .route('/:userId/friends/:friendId')
  .delete(deleteFriend);

module.exports = router;