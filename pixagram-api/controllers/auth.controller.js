const express = require('express');
const router = express.Router();
const UserModel = require('./../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('./../config/index.config');
const MAP_USER_REQ = require('./../helpers/map_user_req');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
function generateToken(data){
    return jwt.sign({
        _id: data._id,
        username: data.username,
        role : data.role
    }, config.JWT_SECRET/*, {
        expiresIn: '1d'
    }*/)
    //Now this function will return token
}

router.route('/login')
.post((req, res, next) => {
    // TODO : Validate request object with express validator

    console.log('Login req body --> ', req.body);
    // Check if the user exists in database
    // if it doesn't exist give user error message
    // if exists
        //validate password
        // if not valid, give user error message
        //if valid, generate token

    UserModel.findOne({
        email: req.body.email
    })
    .then((data) => {
        console.log('user --> ', data);
        // res.json(data);
        if(!data){
            //no user exists
            return next({
                msg: 'Invalid credentials',
                status : 404
            })
        }
        //user exists
        const isValid = bcrypt.compareSync(req.body.password, data.password);
        if(!isValid){
            // Not valid password
            console.log('Not Valid password')
            return next({
                msg: 'Invalid credentials',
                status : 404
            })
        }else{
            // Valid password
            let token = generateToken(data);
            res.json({
                user : data,
                token : token
            })
        }
    })
})

router.route('/register')
.post((req, res, next) => {
    //TODO: validate req.body with express validator
    console.log('Register body --> ', req.body);
    const newUser = new UserModel({});
    // Map user
    MAP_USER_REQ(req.body, newUser); //Because of the value by reference thing, no need to save this into another variable

    // Hash password with bcryptjs
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    newUser.password = hashedPassword;

    // Save into database and generate token
    newUser.save((err, result) => {
        if(err){
            console.log('failed to save in database(register body)')
            return next(err);
        }
        let token = generateToken(result);
        res.json({
            token : token,
            user: result
        })
    })
})

module.exports = router;