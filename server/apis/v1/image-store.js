import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const router = express.Router(); //eslint-disable-line
const storage = multer.diskStorage({
  'destination': (req, file, callback) => {

    callback(null, './library/images');
  },
  'filename': (req, file, callback) => {
    callback(null, `${file.originalname.split('.')[0]}_${Date.now()}.jpg`);
  }
});
const upload = multer({
  storage
}).array('image', 4);

router.post('/v1/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.end('Something went wrong!');
    }
    return res.end('Successfully uploaded');
  });
});

router.get('/v1/view', (req, res) => {
  const files = fs.readdirSync(path.join(__dirname, '../../library/images'));

  return res.json(files);
});

export default router;