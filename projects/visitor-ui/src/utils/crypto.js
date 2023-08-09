import cryptoJs from 'crypto-js';
const key = import.meta.env.VITE_CRYPTO_KEY;

function encrypt(str) {
  return cryptoJs.AES.encrypt(str, key).toString();
}

function decrypt(str) {
  return cryptoJs.AES.decrypt(str, key).toString(cryptoJs.enc.Utf8);
}

export { encrypt, decrypt };
