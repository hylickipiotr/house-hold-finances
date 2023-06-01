import { GetPublicKeyOrSecret, JwtPayload, verify } from 'jsonwebtoken';
import JwksRsa, { CertSigningKey } from 'jwks-rsa';

// https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-key-sets
// https://{yourDomain}/.well-known/jwks.json

const client = JwksRsa({
  jwksUri: process.env.JWKS_URI,
});

const isCertSigningKey = (key: JwksRsa.SigningKey): key is CertSigningKey =>
  'publicKey' in key;

const getPublicKey: GetPublicKeyOrSecret = (header, callback) => {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    const signingKey = isCertSigningKey(key) ? key.publicKey : key.rsaPublicKey;
    return callback(null, signingKey);
  });
};

async function validateJwt(token: string): Promise<JwtPayload> {
  const bearerToken = token.split(' ')[1];
  return new Promise((resolve, reject) => {
    verify(
      bearerToken,
      getPublicKey,
      {
        audience: process.env.AUDIENCE,
        issuer: process.env.ISSUER,
        algorithms: ['RS256'],
      },
      (err, decodedJwt) => {
        if (err) return reject(err);
        return resolve(decodedJwt as JwtPayload);
      }
    );
  });
}

export default validateJwt;
