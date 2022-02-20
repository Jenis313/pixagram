module.exports = (reqPost, post) => {
    if(reqPost.title) 
        post.title = reqPost.title;
    if(reqPost.description)
        post.description = reqPost.description;
    if(reqPost.author)
        post.author = reqPost.author;
    if(reqPost.approved)
        post.approved = reqPost.approved;
    if(reqPost.tags)
        post.tags = reqPost.tags;
    if(reqPost.image)
        post.image = reqPost.image;
    if(reqPost.cloud_id)
        post.cloudinary_id = reqPost.cloud_id;
    return post;
}