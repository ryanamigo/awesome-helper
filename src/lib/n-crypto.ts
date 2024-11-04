import Crypto from 'crypto-js';
export function encrypt(aesKey: string, aesIv: string, word: unknown): string | undefined {
  const key = Crypto.enc.Utf8.parse(aesKey);
  const iv = Crypto.enc.Utf8.parse(aesIv);
  let srcs: Crypto.lib.WordArray | null = null;
  let encrypted: Crypto.lib.CipherParams | null = null;
  if (!word) {
    return '';
  }
  if (typeof word === 'string') {
    srcs = Crypto.enc.Utf8.parse(word);
  } else if (typeof word === 'object') {
    try {
      srcs = Crypto.enc.Utf8.parse(JSON.stringify(word));
    } catch (error) {
      srcs = null;
      console.log('JSON解析出错', error);
    }
  }
  if (srcs) {
    encrypted = Crypto.AES.encrypt(srcs, key, {
      iv,
      mode: Crypto.mode.CBC,
      padding: Crypto.pad.Pkcs7,
    });
  }

  return encrypted?.ciphertext.toString();
}

export function decrypt(aesKey: string, aesIv: string, word: string): string | undefined {
  const key = Crypto.enc.Utf8.parse(aesKey);
  const iv = Crypto.enc.Utf8.parse(aesIv);
  const encryptedHexStr = Crypto.enc.Hex.parse(word);
  const srcs = Crypto.enc.Base64.stringify(encryptedHexStr);
  const decrypted = Crypto.AES.decrypt(srcs, key, {
    iv,
    mode: Crypto.mode.CBC,
    padding: Crypto.pad.Pkcs7,
  });
  const decryptedStr = decrypted.toString(Crypto.enc.Utf8);
  return decryptedStr.toString();
}