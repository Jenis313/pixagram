const express = require('express');
const UserModel = require('./../models/user.model');
const PostModel = require('./../models/post.model');
const router = express.Router();
const Uploader = require('./../middlewares/Uploader')('image');
const MAP_USER_REQ = require('./../helpers/map_user_req');
const cloudinary = require('./../config/cloudinary.config');

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
    .populate('author', {username : 1, image: 1, _id: 1})
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
                next({
                    msg : 'User not found',
                    status : 404
                });
                return
            }
            res.json(result);
        })
})
.put(Uploader.array('images')/*review Concept section on top also check while importing */, (req,res,next) => {
// uploader always takes an image so I am using .put for image and text, or image only and .patch for text only update. 
    if(!req.currentUser){
        // no valid token
        next({
            msg: 'Not logged In',
            status: 404
        });
        return
    }else{
        if(req.typeError){
            // check error in multer
            next({
                msg: 'Invalid Format || Please upload valid file',
                status: 406
            });
            return
        }
        console.log(req.params.id, req.currentUser._id);
        if(req.params.id !== (req.currentUser._id.toString()) ){
            // editing someone else's token
            next({
                msg: "Sorry you can't perform this task",
                status : 401 
            })
            return
        }

        UserModel
        .findOne({
            _id : req.params.id
        }, (err, user) => {
            // query error
            if(err) {
                next(err);
                return
            }
            // user doesn't exit
            if(!user){
                next({
                    msg: 'User Not Found',
                    status: 404
                })
                return
            }
            // console.log('path --> ', req.files[0].path)
            cloudinary.uploader.upload(req.files[0].path,(err, result) => {
                // console.log('cloud result', result);

            // ///////////////////////////////Remove old logic to host images to cloudinary see github repo to see old one//////////////////////
            // https://www.youtube.com/watch?v=LWB1s6P0wgE

                req.body.image =  result.secure_url;
                req.body.cloud_id = result.public_id;
                let mappedUpdatedUser = MAP_USER_REQ(req.body, user);
                // save updated req
                mappedUpdatedUser.save((err, result) => {
                    if(err){
                        return next(err);
                    }
                    console.log(result);
                    res.json(result);
                })
                // ///////////////////////////////Remove old logic to host images to cloudinary see github repo to see old one//////////////////////


            })
        })
    }
})
.patch((req,res,next) => {

    if(!req.currentUser){
        // no valid token
        next({
            msg: 'Not logged In',
            status: 404
        });
        return
    }else{
        console.log(req.params.id, req.currentUser._id);
        if(req.params.id !== (req.currentUser._id.toString()) ){
            // editing someone else's token
            next({
                msg: "Sorry you can't perform this task",
                status : 401 
            })
            return
        }

        UserModel
        .findOne({
            _id : req.params.id
        }, (err, user) => {
            // query error
            if(err) {
                next(err);
                return
            }
            // user doesn't exit
            if(!user){
                next({
                    msg: 'User Not Found',
                    status: 404
                })
                return
            }
            let mappedUpdatedUser = MAP_USER_REQ(req.body, user);
    
            // save updated req
            mappedUpdatedUser.save((err, result) => {
                console.log('yeah done', result)
                if(err){
                    return next(err);
                }
                res.json(result);
            })
        })
    }
})
module.exports = router;