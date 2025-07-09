import nacl from 'tweetnacl';
import naclUtil from 'tweetnacl-util';

// Generate a new key pair
export function generateKeyPair() {
  return nacl.box.keyPair();
}

// Encrypt a message with recipient's public key and sender's secret key
export function encryptMessage(message: string, theirPublicKey: Uint8Array, mySecretKey: Uint8Array) {
  const nonce = nacl.randomBytes(nacl.box.nonceLength);
  const encrypted = nacl.box(
    naclUtil.decodeUTF8(message),
    nonce,
    theirPublicKey,
    mySecretKey
  );
  return { encrypted, nonce };
}

// Decrypt a message with sender's public key and recipient's secret key
export function decryptMessage(encrypted: Uint8Array, nonce: Uint8Array, theirPublicKey: Uint8Array, mySecretKey: Uint8Array) {
  const decrypted = nacl.box.open(
    encrypted,
    nonce,
    theirPublicKey,
    mySecretKey
  );
  return decrypted ? naclUtil.encodeUTF8(decrypted) : null;
}