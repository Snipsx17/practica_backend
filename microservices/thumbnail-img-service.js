const cote = require('cote');
const Jimp = require('jimp');

const { Responder } = cote;
const responder = new Responder({ name: 'image-resizer-service' });
responder.on('resize-img', (req, callback) => {
  console.log('llego una solicitud para redicmencionar', req);

  const { imageName, origin } = req;
  Jimp.read(`${origin}/${imageName}`)
    .then((img) => {
      return img
        .resize(100, 100)
        .quality(60)
        .write(`${origin}/thumbnails/thumbnail-${imageName}`);
    })
    .catch((err) => {
      console.error(err);
    });
});
