import cloudinary from 'cloudinary';
import { API_KEY_CLOUDINARY, API_SECRET_CLOUDINARY } from '../../config/envConfig/config';

cloudinary.v2.config({
    cloud_name: 'HireMeUp', 
    api_key: API_KEY_CLOUDINARY,
    api_secret: API_SECRET_CLOUDINARY
});

export const uploadFile = (path: any) => {
    cloudinary.v2.uploader.upload(path, function (error: any, result: any) {
        if (error) {
            console.error(error);
        
        } else {
            console.log(result);
       
        }
    });
};
