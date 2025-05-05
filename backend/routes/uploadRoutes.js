import path from 'path';
import multer from 'multer';
import express from 'express';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Uploads/');
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Images only (jpeg, png, webp)'), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (req.file) {
      // Return absolute URL
      const imageUrl = `http://localhost:5000/Uploads/${req.file.filename}`;
      return res.status(200).json({
        message: 'Image uploaded successfully',
        image: imageUrl,
      });
    }
    res.status(400).json({ message: 'No image provided' });
  });
});

export default router;