import express from 'express';
import multer from 'multer';
import path from 'path';
import { eachOf } from 'async';
import Datauri from 'datauri';
import Cloudinary from './Cloudinary.config';

const router = express.Router(); //eslint-disable-line
const upload = multer().array('image', 4);


router.post('/v2/upload', upload, (req, res) => {
  const image = req.files, imageContent = new Datauri();

  if (!image) {
    return res.status(404).json({ 'success': false, 'message': 'No image uploaded.' });
  }
  return eachOf(image, (croppedImage, index, callback) => {
    imageContent.format(path.extname(croppedImage.originalname).toString(), croppedImage.buffer);
    Cloudinary.v2.uploader.upload(imageContent.content,
      { 'public_id': `${croppedImage.originalname.split('.')[0]}_${Date.now()}.jpg` },
      (response) => {
        if (response && (response.error || response.err)) {
          callback(response);
          return res.status(500).json('Error in saving logo.');
        }
        return callback();
      });
  }, (err) => {
    if (err) {
      return res.status(500).json('Error in saving images.');
    }
    return res.end('Successfully uploaded');
  });
});

// Returns list of images in library
router.get('/v2/library/images', (req, res) => {

  Cloudinary.v2.api.resources({ 'type': 'upload' }, (error, result) => {
    if (error) {
      console.log(error);
      res.json('Something went wrong');
    }
    let response = [];
    
    console.log(result);
    result.resources.forEach((r) => {
      response.push(r.url);
    });
    return res.json(response);
  });

});

export default router;
