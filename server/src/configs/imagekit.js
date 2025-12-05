import Imagekit from 'imagekit';
import dotenv from 'dotenv';

dotenv.config();

console.log("🔍 ImageKit ENV Check:", {
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY ? "OK" : "MISSING",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const imagekit = new Imagekit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

export default imagekit;