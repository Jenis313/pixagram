const router = require('express').Router();
const authenticate = require('./../middlewares/authentication');

// import routes
const userRouter = require('./../controllers/users.controller');
const authRouter = require('./../controllers/auth.controller');
const postRouter = require('./../controllers/posts.controller');
const logoutRouter = require('./../controllers/logout.controller');

//load routes
router.use('/users', authenticate, userRouter);
router.use('/auth', authenticate, authRouter);
router.use('/post', authenticate, postRouter);
router.use('/logout', authenticate, logoutRouter);
module.exports = router;