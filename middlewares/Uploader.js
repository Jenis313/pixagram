// Very Very important thing to notice
// If the content type is x-www-encoded no need to use third party middleware 
// If content type is multipart/form-data we need to use third party middleware so multer is one of them and it is not just for image upolad it will parse all the contents that is send as request and if you don't parse the content type multipart/form-data you will not get any object in request.
// For cloudinary it has been changed a little bit so visit old setup for localhost

const path = require('path')
//we use multer here to use file upload task
const multer = require('multer'); //Multer is third party middleware and it is used to upload files(This only works for file encoded type: multipart/form-data)

function imageFilter(req, file, cb){
    var mime_type = file.mimetype.split('/')[0];
    if(mime_type === 'image'){
        cb(null, true)
    }else{
        req.typeError = true;//we have the request object here so we are putting typeError in req object if the else block run which means type is invalid and we will use this typeError property(we just insert into req obj) to alert users about invalid files.
        cb(null, false)
    }
}
function pdfFilter(req, file, cb){
        if(file.mime_type === 'application/pdf'){
            cb(null, true)
        }else{
            req.typeError = true;
            cb(null, false)
        }
}
    
function sizeFilter(req, file, cb){
    if(file.size< 209){
        cb(null, true);
    }else{
        req.fileSizeError = true;
        cb(null, false);
    }
}

const file_storage = multer.diskStorage({
    //This is decides where to store the uploaded files in the server with the name we wanted to keep. And don't forget it is a method of multer which is a third party middleware 
    // we are storing images in cloudinary so diskStorage is empty see github repo for old code or uncomment the following code
})


module.exports = function (filterType){
    const MAP_FILTER = {
        image: imageFilter,
        pdf: pdfFilter,
        size: sizeFilter
    }
    const upload = multer({
        storage: file_storage,  //so instead of using multer default way now we use our own way sotrage and naming
        fileFilter: MAP_FILTER[filterType],
    })
    return upload
}