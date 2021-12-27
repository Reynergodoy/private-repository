const crypto = require('crypto');

// Using AES 256 (block cypher)

const algorithm = 'aes-256-cbc';

// Secure both symmetric key and IV in a private enviroment

const key = Buffer.from(process.env.KEY, 'hex'); // crypto.randomBytes(32);

// There is no reason to hide the IV, but we will still do so
const iv = Buffer.from(process.env.IV, 'hex'); // crypto.randomBytes(16);

// This is the code we want to execute using eval. It can also be put inside an environment file, but we may be affected by size constraints depending on the host
const CYPHER_TEXT = "85df53933d16c7cbeb7ed3dc7b3f204212f37184c9cbda056e0d9fde1d7370fd"; // plain text: console.log("it works!");

/*
console.log(iv); // a
console.log(iv.toString('hex')); // b
console.log(Buffer.from(iv.toString('hex'), "hex")); // a

console.log(key); // c
console.log(key.toString('hex')); // d
console.log(Buffer.from(key.toString('hex'), "hex")); // c
*/

// The encryption and decryption functions

const encrypt = function (plain) {
  const _ = crypto.createCipheriv(algorithm, key, iv);
  let cypher = _.update(plain, 'utf8', 'hex');
  cypher += _.final('hex');
  return cypher;
};

const decrypt = function (cypher) {
 const decipher = crypto.createDecipheriv(algorithm, key, iv);
 let decrypted = decipher.update(cypher, 'hex');
 decrypted = Buffer.concat([decrypted, decipher.final()]);
 return decrypted.toString();
};

eval(decrypt(CYPHER_TEXT.toString('hex'))); // output: it works!

// This is a semi-private repository, only those who have the cryptographic key and IV can see and execute the true code inside the cipher text
