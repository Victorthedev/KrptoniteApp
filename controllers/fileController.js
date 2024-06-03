const multer = require('multer');
const fs = require('fs');
const File = require('../models/fileModel');
const User = require('../models/userModel');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image file'), false);
    }
  }
}).single('file');

class FileController {
  async uploadFile(req, res) {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const { apiKey } = req.headers;
      const user = await User.findOne({ apiKey });

      if (!user) {
        return res.status(401).json({ message: 'Invalid API key' });
      }

      const fileData = fs.readFileSync(req.file.path, { encoding: 'base64' });

      const file = new File({
        userId: user._id,
        fileName: req.file.originalname,
        fileData: fileData
      });

      await file.save();
      fs.unlinkSync(req.file.path); 

      res.status(201).json({ message: 'File uploaded successfully' });
    });
  }

  async getFile(req, res) {
    const { fileId } = req.params;
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.status(200).json({ file });
  }

  async getAllFiles(req, res) {
    const files = await File.find();
    res.status(200).json({ files });
  }
}

module.exports = new FileController();
