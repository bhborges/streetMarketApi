import * as express from 'express';
import multer from 'multer';

import ImportController from './ImportController';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'imports/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    if (!file.originalname.includes('xls')) {
      return cb(new Error('Only xls are allowed'));
    }
    cb(null, true);
  },
});

export default express
  .Router()
  .post('/fairs', upload.single('file'), ImportController.locations);
