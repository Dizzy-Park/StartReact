import moment from "moment";
import NodeRSA from "node-rsa";

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAi2MDZTLGU7tIqsICGByy
rnQmp1cZmorAifyf7grqDyKt0LZEgd6cfYs1Ew2SU9mpKJHGENyQMXDGCsnA/Ji0
WfkqP+0KDLkGygkIAD+hvhd84GfdA0HL4MvG0VqgEuXlJ03+Q5QFYq4IksEG6sAJ
GT5aMGiW+MyPmVVdahvXmQD3KWesrBS2zfFkWZ+x/jeMh926H4dmUE5QvEy5nRM9
+ooqw70D1Uj4fP6GS7uU1RbgN1RdomsxtM6rF2fkrH2WUoczU86esI6PlSMjKrM3
Q2Ev7YS3I/aP/DICId00V6vu2kx+7BmmYq1x69JfGPYFO54H75LkF89ZXoJrDl9s
kwIDAQAB
-----END PUBLIC KEY-----`;

/**
 * RSDA 암호
 * @param txt string
 * @returns string
 */
export const encript = (txt: string): string => {
  const key = new NodeRSA(publicKey);
  const enc = key.encrypt(txt, "base64");
  return enc;
};

export const createKey = (): string => {
  const key = new NodeRSA(publicKey);
  const now = moment().format("YYYY-MM-DD HH:mm:ss");
  const encTxt = encript(`${key}||${now}`);
  return encTxt;
};
