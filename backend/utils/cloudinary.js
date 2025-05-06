require('dotenv').config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUploadImage = async(fileToUpload) => {
    try {
        const data = await cloudinary.uploader.upload(fileToUpload, {
            resource_type: "auto"
        });
        return data;
    } catch(error) {
        console.log(error);
        throw new Error("internal server error (cloudinary)");
    }

}

const cloudinaryremoveImage = async(imagePublicId) => {

    try {
       const result = await cloudinary.uploader.destroy(imagePublicId);
       return result;
    } catch(error) {
        console.log(error);
        throw new Error("internal server error (cloudinary)");
    }

}


module.exports = {
    cloudinaryUploadImage,
    cloudinaryremoveImage,
}