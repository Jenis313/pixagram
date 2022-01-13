const router = require('express').Router();
const authenticate = require('./../middlewares/authentication');

// import routes
const userRouter = require('./../controllers/users.controller');
const authRouter = require('./../controllers/auth.controller');
const postRouter = require('./../controllers/posts.controller');


//load routes
router.use('/users', authenticate, userRouter)
router.use('/auth', authenticate, authRouter)
router.use('/post', authenticate, postRouter)

module.exports = router;