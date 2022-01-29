const express = require('express');
const router = express.Router();
const PostModel = require('./../models/post.model');
const Uploader = require('./../middlewares/Uploader')('image');
const MAP_POST_REQ = require('./../helpers/map_post_req');
 
router.route('/')
.get((req, res, next) => {
    const condition = {}
    PostModel
    .find(condition)
    .sort({
        _id: -1
    })
    .populate('author', {username:1, _id: 1 }) //gives username and id
    .populate('comments.user', {_id: 1}) //gives id only
    .populate('likes.user', {_id: 1})
    // https://stackoverflow.com/questions/14594511/mongoose-populate-within-an-object?rq=1
    .exec()
    .then((data) => {
        // console.log(data)

        // Paginage the result
        // data is an array and we are paginating that array
        const page = parseInt(req.query.page) || 1;
        const limit = 10; //can be changed form query if needed
        const startIndex = (page-1) * limit;
        const endIndex = page * limit;
        const results = {}
        if(startIndex > 0){
            results.previous = page - 1;
        }
        if(endIndex<data.length){
            results.next = page + 1;
        }
        results.posts = data.slice(startIndex, endIndex);;
        res.json(results);

    })
    .catch((err) => {
        next(err);
    })
})

router.route('/new')
.post(Uploader.single('image'), (req, res, next) => {
    if(!req.currentUser){
        next({
            msg: 'Not logged in',
            status: 401
        })
    }else{
        console.log('new post req body --> ',req.body)
        console.log('new post req file --> ',req.file)
        if(req.typeError){
            next({
                msg: 'Invalid Format || Please upload valid file',
                status: 406
            });
        }
        if(req.file){
            req.body.image = req.file.filename;
        }
        const newPost = new PostModel({});
        // Map request object
        MAP_POST_REQ(req.body, newPost);
        newPost.author = req.currentUser.id;
    
        newPost.save((err, result) => {
            if(err){
                console.log('error in saving new post');
                return next(err);
            }
            res.json(result);
        })
    }

    
})

router.route('/:id/comment')
.post((req, res, next) => {
    if(!req.currentUser){
        next({
            msg: 'Not logged in',
            status: 401
        })
    }else{
        const postId = req.params.id
        console.log('comments body --> ', req.body);
        PostModel
        .findOne({_id : postId}, (err, post) => {
            if(err){
                return next(err);
            }
            if(!post){
                return next({
                    msg: 'post not found',
                    status: 404
                })
            }
            const newComment = {};
            newComment.user = req.currentUser.id;
            newComment.message = req.body.message;
            post.commentsCount = post.comments.length + 1;
            post.comments.push(newComment);
            post.save((err, result) => {
                if(err){
                    return next(err);
                }
                res.json(result);
            })
        })
    }
})

router.route('/:id/like')
.post((req, res, next) => {
    if(!req.currentUser){
        return next({
            msg: 'not logged in',
            status: 401
        })
    }
    PostModel.findOne({
        _id: req.params.id
    }, (err, post) => {
        if(err){
            return next(err);
        }
        if(!post){
            return next({
                msg : 'post not found',
                status : 404
            })
        }
        // res.send(req.body.liked)
        post.likesCount = req.body.likesCount;
        post.likes = req.body.likes;
        // post.likes.push(req.currentUser._id.toString())
        // console.log('currentUser -------------------->',req.currentUser._id.toString())
        post.save((err, result) => {
            if(err){
                return next(err);
            }
            res.json(result);
        })
    })
})

router.route('/search')
.get((req, res, next) => {
    // https://stackoverflow.com/questions/43729199/how-i-can-use-like-operator-on-mongoose
})

router.route('/:id')
.get((req, res, next) => {
    PostModel
    .findOne({
        _id : req.params.id
    })
    .populate('author', {username:1, _id: 1 }) //gives username and id
    .populate('comments.user', {fullName : 1, _id: 1}) //gives id only
    .populate('likes.user', {fullName : 1, _id: 1})
    // https://stackoverflow.com/questions/14594511/mongoose-populate-within-an-object?rq=1
    .exec()
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        next(err);
    })
})
.put((req, res, next) => {
   
})
.delete((req, res, next) => {
    if(!req.currentUser){
        return next({
                msg : 'not logged in',
                status: 401
            })
    }
    PostModel
    .findOne({
        _id : req.params.id
    }, (err, post) => {
        // console.log('crr id --> ', req.currentUser.id);
        // console.log('post author --> ', post.author._id.toString());
        if(req.currentUser.id === post.author._id.toString()){
            // https://kb.objectrocket.com/mongo-db/mongoose-deleteone-922
            PostModel.deleteOne({
                _id : req.params.id
            }, (err, result) => {
                if(err){
                    return next(err);
                }
                else{
                    res.json(result);
                }
            })
        }else{
            return next({
                msg: 'You cannot delete this post',
                status: 403
            })
        }
    })
})
module.exports = router;