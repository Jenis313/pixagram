const JWT = require('jsonwebtoken');
const config = require('./../config/index.config');
const UserModel = require('./../models/user.model');

module.exports = function(req, res, next){
    let token;
    if (req.headers['authorization'])
        token = req.headers['authorization']
    if (req.headers['x-access-token'])
        token = req.headers['x-access-token']
    if (req.query['token'])
        token = req.query['token']
        // console.log('token-->',token);
    if(!token){
        console.log('No token')
        return next();
        // if you don't want to give access to some routes at all then just give message saying not authenticated here instead of passing to next middleware
    }else{
        //Token available now
        JWT.verify(token, config.JWT_SECRET, (err, result) => {
            if(err){
                console.log('Not valid token');
                return next(err);
            }
                // console.log('result--> ', result)
            // console.log('Token verification successful'); 
            // Now check if the token details are up-to-date with the database
            UserModel
            .findById(result._id, (err, user) => {
                if(err){
                    next(err);
                    return
                }
                // Case token verified but not up-to-date with db
                if(!user){
                    return next({
                        msg: 'User removed from the system',
                        status: 404  
                    })
                }
                // Case token verified and up-to-date with database
                    // console.log('current user--> ',user);
                // Set user's detail to request object
                req.currentUser = user;
                next();
            })
        })
    }
}