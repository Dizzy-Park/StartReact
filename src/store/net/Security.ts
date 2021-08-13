import moment from "moment";
import NodeRSA from "node-rsa";

const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCLYwNlMsZTu0iq
wgIYHLKudCanVxmaisCJ/J/uCuoPIq3QtkSB3px9izUTDZJT2akokcYQ3JAxcMYK
ycD8mLRZ+So/7QoMuQbKCQgAP6G+F3zgZ90DQcvgy8bRWqAS5eUnTf5DlAVirgiS
wQbqwAkZPlowaJb4zI+ZVV1qG9eZAPcpZ6ysFLbN8WRZn7H+N4yH3bofh2ZQTlC8
TLmdEz36iirDvQPVSPh8/oZLu5TVFuA3VF2iazG0zqsXZ+SsfZZShzNTzp6wjo+V
IyMqszdDYS/thLcj9o/8MgIh3TRXq+7aTH7sGaZirXHr0l8Y9gU7ngfvkuQXz1le
gmsOX2yTAgMBAAECggEAP8K0O+elF4pVbF9BC/ycs/bH88aBHNOZzcU093Qgq3nG
nvGxluLZHQi/545OwHKR0dAVFYN/pk4bGbY+xI2p+npjHEj3TuiYtXS6Jzr0Zvth
kVmRnTrM43Dz6rKVBPALChbAV/NvHzvTCiaoXlwoDVcbdIdzgC47Bf4ptC82SXOZ
iaf98NUJDvChuDZ2+naa4noG9I8VjD/FqFN6MXYmnFRlR4VN5v+2X3ywRG79RfqA
9hEUuoftNrpdg7S941ewWpneRVwXSubs65LM9z+0wcp1RWKRthNIQSiUZ+xFAJTC
+IjkeSVdOFiYkzARBi7HvEeNLXs/81XHC1/3+f66KQKBgQDrtFVQ6A9GbZPFyc9L
txjfEDdWFEi/w/kIeZv9XwJHTQbQMVSCkM57HsGkBmn7vWSf0rWZOBzXS6DlxkrX
saeAmnfm6YzojQM30Alu5795nRe/QCFAdphryqXdRjYkstk5Tv5PuQNJa8X5Npww
8D2blv5NiC7T7+IoOtUUvxS4RwKBgQCXY4k2R5YsNRL0XbiMLzacPi5gKX2Z+bgO
qXoWfIUUnM02sMB/ulMCYh044ktxlNmvxDNI4V9kKmsfp1L9C3UW4uqqe29Hu/GK
96Wf66P1PqkWo+CJvXBTybPJhGrx63ZX37noX8rC8YJIBu+Xsbw6/gcvwDRgO41c
TeU09JtbVQKBgQDrS19r3+z3woWlCdwtWn+ylg6XmLIy9SCSbEvjOEgfA27MwKH7
oTDuyXpHErwUOTHNNlxgsxpfdjkNh9DI16k+AXW2hulKcRKIUd5I34JOlhrRqeRH
5NwtpuPDK8b7BatBwXCwByKX1cWRDgoH9JubybTdkxgkLDEZNfnmtwWpGwKBgQCM
C2YZMmv3hTl9mV1pQRvRuawJBRjN4bakyZ7JQnORt+QW3beV8PVtVPoXby+/aKVf
9a5Dk0k9Tgg/Bfi9YWX1wAC5qOouf+xYU/OBVukbq9WbvgmvIfHRcNvCZZ7RILMf
YzWFg2f8opGUs+XcfGzWXbykLbfF9hE0/FI2hLla6QKBgQDdihAnBOfRmHr4FmQ3
D4cUjubursSTiEryzwxzW8CLk8fSoAlmdwsOFmlxfeelZ88esy1IYkRl5CZiR3Lu
WIOFZ3ElO3N4JSQ9CenGylvyY9/8WXzCqT2JgEDt4Ad0EVdIm4213ihWzAz9j017
cUDpWGg9Pa7xpu4pNVu+w2ejug==
-----END PRIVATE KEY-----`;
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
/**
 * 복호화
 * @param txt string
 * @returns string
 */
export const decrypt = (txt: string): string => {
  const key = new NodeRSA(privateKey);
  const enc = key.encrypt(txt, "utf8");
  return enc;
};

export const createKey = (): string => {
  const key = new NodeRSA(publicKey);
  const now = moment().format("YYYY-MM-DD HH:mm:ss");
  const encTxt = encript(`${key}||${now}`);
  return encTxt;
};
