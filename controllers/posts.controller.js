const express = require('express');
const router = express.Router();
const PostModel = require('./../models/post.model');
const Uploader = require('./../middlewares/Uploader')('image');
const MAP_POST_REQ = require('./../helpers/map_post_req');
const cloudinary = require('./../utils/cloudinary');

router.route('/')
.get((req, res, next) => {
    const condition = {}
    PostModel
    .find(condition)
    .sort({
        _id: -1
    })
    .populate('author', {username:1,  image : 1, _id: 1 }) //gives username and id
    .populate('comments.user', {_id: 1}) //gives id only
    .populate('likes.user', {_id: 1})
    // https://stackoverflow.com/questions/14594511/mongoose-populate-within-an-object?rq=1
    .exec()
    .then((data) => {
        // console.log(data)
        // https://www.youtube.com/watch?v=ZX3qt0UWifc&t=761s
        // Paginage the result
        // data is an array and we are paginating that array
        const page = parseInt(req.query.page) || 1;
        const limit = 5; //can be changed form query if needed
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
.post(Uploader.array('images'), (req, res, next) => {
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
        if(req.files&&req.files.length){ //it means it has image in the request
            /*req.body.image =  req.files[0].filename */ //there will be only one image in this post request so I am doing this otherwise I would do something like
            // req.body.images = req.files.map((item) => {
            //     return item.filename;
            // })
           //we are adding the value in the request body object because this is a middleware and it can add update and delete request.

            // ///////////////////////////////Remove old logic to host images to cloudinary see github repo to see old one//////////////////////
            cloudinary.uploader.upload(req.files[0].path,(err, result) => {
                console.log('cloud result', result);
                req.body.image =  result.secure_url;
                req.body.cloud_id = result.public_id;

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

            // ///////////////////////////////Remove old logic to host images to cloudinary see github repo to see old one//////////////////////
            })
        }else{
            // No image case
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
        .findOne({_id : postId})
        // .populate('author', {username:1, _id: 1 }) //gives username and id
        // .populate('comments.user', {fullName : 1, _id: 1}) //gives id only
        // .populate('likes.user', {fullName : 1, _id: 1})
        // https://stackoverflow.com/questions/14594511/mongoose-populate-within-an-object?rq=1
        // .exec()
        .then((post) => {
            if(!post){
                return next({
                    msg: 'post not found',
                    status: 404
                })
            }
            const newComment = {};
            newComment.user = req.currentUser.id;
            newComment.message = req.body.message;
            post.commentsCount = req.body.commentsCount;
            post.comments.push(newComment);
            post.save((err, result) => {
                if(err){
                    return next(err);
                }
                result.populate('comments.user', {fullName : 1, image : 1, _id: 1}, function(err, response) {
                    res.json(response)
                   });
            }) //

        })
        .catch((err) => {
            return next(err);
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
    let q = req.query.q ? req.query.q : '';
    console.log(q)
    PostModel.find({
        // https://stackoverflow.com/questions/33627238/mongoose-find-with-multiple-conditions
        $or:[
            {title : { $regex: '.*' + q + '.*' }},
            {description : { $regex: '.*' + q + '.*' }}
        ]
    })
    .exec()
    .then((data) => res.json(data))
    .catch(err => {
        console.log(err);
        next(err);
    })
})

router.route('/:id')
.get((req, res, next) => {
    PostModel
    .findOne({
        _id : req.params.id
    })
    .populate('author', {username:1, image : 1, _id: 1 }) //gives username and id
    .populate('comments.user', {fullName : 1, image : 1, _id: 1}) //gives id only
    .populate('likes.user', {fullName : 1, _id: 1})
    // https://stackoverflow.com/questions/14594511/mongoose-populate-within-an-object?rq=1
    .exec()
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        next(err)
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