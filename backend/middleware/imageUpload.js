const path = require("path");
const multer = require("multer");

// photo storage
const photoStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, "../imgs"))
    },
    filename: function(req, file, cb){
        if(file)
        {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + file.originalname);
        } else {
            cb(null, false);
        }
    }
});


// photo uplaod middleware
const imageUpload = multer({
    storage: photoStorage,
    fileFilter: function(req, file, cb){
        if(file.mimetype.startsWith("image"))
        {
            cb(null, true);
        }  else {
            cb({message: "unsupported file format"}, false);
        }
    },
    limits: {fileSize: 1024 * 1024}
})


module.exports = {
    imageUpload
}