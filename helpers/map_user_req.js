module.exports = (reqUser, user) => {
    if(reqUser.fullName) 
        user.fullName = reqUser.fullName;
    if(reqUser.role)
        user.role = reqUser.role;
    if(reqUser.username)
        user.username = reqUser.username;
    if(reqUser.password)
        user.password = reqUser.password;
    if(reqUser.email)
        user.email = reqUser.email;
    if(reqUser.image)
        user.image = reqUser.image;
    if(reqUser.cloud_id)
        user.cloudinary_id = reqUser.cloud_id;
    if(reqUser.active)
        user.active = reqUser.active
    return user;
}