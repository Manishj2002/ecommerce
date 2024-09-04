import path from 'path'
import multer from 'multer'

import express from 'express'
const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const extname = path.extname(file.originalname)
      cb(null, `${file.fieldname}-${Date.now()}${extname}`)
    }
  })
  
  const fileFilter = (req, file, cb) => {
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    if (filetypes.test(extname) && mimetypes.test(mimetype)) {
        cb(null,true)
    }else{
        cb(new Error("Image Only"),false)
    }
  };
  
  const upload = multer({ storage,fileFilter })
 const uploadSingleImage = upload.single('image')
router.post('/',(req,res)=>{
    uploadSingleImage(req,res,(err)=>{
        if (err) {
            res.send({message:err.message})
        }else if (req.file) {
            res.send({
                message:"Image Uplaod successfully",
                image:`/${req.file.path}`
            })
        }else{
            res.send({message:"image is not provided"})
        }
    })
})

export default router;