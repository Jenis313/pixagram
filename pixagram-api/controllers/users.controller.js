const express = require('express');
const UserModel = require('./../models/user.model');
const PostModel = require('./../models/post.model');
const router = express.Router();
router.route('/')
.get((req, res, next) => {
    UserModel
    .find({})
    .sort({
        _id:-1 //IT reverses the data flow
    })
    // .limit(1) // it limits the result
    // .skip(2) //For skipping
    .exec((err, result) => {
        if(err){
            next(err);
            return
        }
        res.json(result);
    })
})

router.route('/:id/posts')
.get((req, res, next) => {
    const id = req.params.id;
    console.log('id ----> ', id)
    PostModel
    .find({
        author : id
    })
    .sort({
        _id:-1 //IT reverses the data flow
    })
    .populate('author', {username : 1, _id: 1})
    // .limit(1) // it limits the result
    // .skip(2) //For skipping
    .exec((err, result) => {
        if(err){
            next(err);
            return
        }
        res.json(result);
    })
})

router.route('/:id')
.get((req, res, next) => {
    // console.log('params is --> ', req.params);
    UserModel
        .findOne({
            _id : req.params.id
        })
        .exec((err, result) => {
            if(err){
                next(err);
                return
            }
            res.json(result);
        })
})
.put((req, res, next) => {
    // Update and add profile image

})
.delete((req, res, next) => {
    // If req.params.id === currentUser.id allow user to delete otherwise can't delete
})
module.exports = router;