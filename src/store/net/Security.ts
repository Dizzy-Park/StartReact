import crypto, { Cipher, Decipher } from "crypto";

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAi2MDZTLGU7tIqsICGByy
rnQmp1cZmorAifyf7grqDyKt0LZEgd6cfYs1Ew2SU9mpKJHGENyQMXDGCsnA/Ji0
WfkqP+0KDLkGygkIAD+hvhd84GfdA0HL4MvG0VqgEuXlJ03+Q5QFYq4IksEG6sAJ
GT5aMGiW+MyPmVVdahvXmQD3KWesrBS2zfFkWZ+x/jeMh926H4dmUE5QvEy5nRM9
+ooqw70D1Uj4fP6GS7uU1RbgN1RdomsxtM6rF2fkrH2WUoczU86esI6PlSMjKrM3
Q2Ev7YS3I/aP/DICId00V6vu2kx+7BmmYq1x69JfGPYFO54H75LkF89ZXoJrDl9s
kwIDAQAB
-----END PUBLIC KEY-----`;

interface ICipherParam {
  CipherKey: Buffer;
  BinaryLike: Buffer;
}

enum Encode {
  UTF8 = "utf8",
  BASE64 = "base64",
  HEX = "hex",
}

// const getCipher = (): ICipherParam => {
//   const { key, slice } = useSecurity();
//   const sba: Buffer = Buffer.from(key, Encode.UTF8);
//   const iv: Buffer = Buffer.from(sba.slice(0, slice));
//   return { CipherKey: sba, BinaryLike: iv };
// };

/**
 * AES 암호화 처리
 * @param data string
 * @returns string
 */
// export const _encode = (data: string): string => {
//   if (data) {
//     const { algorithm } = useSecurity();
//     const param: ICipherParam = getCipher();
//     const cipher: Cipher = crypto.createCipheriv(
//       algorithm,
//       param.CipherKey,
//       param.BinaryLike
//     );
//     const result: string = cipher.update(
//       data.toString(),
//       Encode.UTF8,
//       Encode.BASE64
//     );
//     return result + cipher.final(Encode.BASE64);
//   } else {
//     return data;
//   }
// };
/**
 * AES 복호화 처리
 * @param data string
 * @returns string
 */
// export const _decode = (data: string): string => {
//   if (data) {
//     const { algorithm } = useSecurity();
//     const param: ICipherParam = getCipher();
//     const cipher: Decipher = crypto.createDecipheriv(
//       algorithm,
//       param.CipherKey,
//       param.BinaryLike
//     );
//     const result: string = cipher.update(data, Encode.BASE64, Encode.UTF8);
//     return result + cipher.final(Encode.UTF8);
//   } else {
//     return data;
//   }
// };

/**
 * RSDA 암호
 * @param txt string
 * @returns string
 */
export const encript = (txt: string): string => {
  const enc: string = crypto
    .publicEncrypt(publicKey, Buffer.from(txt, Encode.UTF8))
    .toString(Encode.BASE64);
  return enc;
};

export const decrypt = (txt: string): string => {
  const enc: string = crypto
    .publicDecrypt(publicKey, Buffer.from(txt, Encode.BASE64))
    .toString(Encode.UTF8);
  return enc;
};
