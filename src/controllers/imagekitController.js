const crypto = require('crypto');

const getImageKitAuth = (req, res) => {
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

  if (!publicKey || !privateKey) {
    return res.status(500).json({ message: 'ImageKit keys not configured' });
  }

  const token = crypto.randomBytes(16).toString('hex');
  const expire = Math.floor(Date.now() / 1000) + 60 * 5; // 5 minutes
  const signature = crypto
    .createHmac('sha1', privateKey)
    .update(token + expire)
    .digest('hex');

  res.json({
    token,
    expire,
    signature,
    publicKey,
  });
};

module.exports = { getImageKitAuth };