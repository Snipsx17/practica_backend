const multer = require('multer');
const path = require('node:path');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const filePath = path.join(__dirname, '..', 'public', 'images', 'anuncios');
    console.log(filePath);
    callback(null, filePath);
  },
  filename: function (req, file, callback) {
    const fileName = `${file.fieldname}-${Date.now()}.${
      file.mimetype.split('/')[1]
    }`;
    callback(null, fileName);
  },
});

const upload = multer({ storage });

module.exports = upload;
