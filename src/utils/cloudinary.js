import { v2 as cloudinary } from 'cloudinary';

import fs from 'fs';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRETE
});



const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new Error('Avatar file is required');
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto'
    });

    console.log('File uploaded to Cloudinary:', response.url);

    // Delete the local file after successful upload
    fs.unlinkSync(localFilePath);
    console.log('Local file deleted successfully.');

    return response;
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);

    // Handle file deletion if upload fails
    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
      console.log('Local file deleted due to upload error.');
    }

    return null;
  }
};

export { uploadOnCloudinary };

