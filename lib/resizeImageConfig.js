const cote = require('cote');
const path = require('node:path');

const imageResize = (imageName) => {
  const { Requester } = cote;

  const requester = new Requester({ name: 'resize-img-request' });

  const request = {
    type: 'resize-img',
    imageName,
    origin: `${path.join(__dirname, '..', 'public', 'images', 'anuncios')}`,
  };

  requester.send(request, (err, res) => {
    console.log(
      'Se envio una solicitud para redimencionar una imagen',
      request
    );
  });
};

module.exports = imageResize;
