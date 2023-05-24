const ErrJWTTokenExpired = 'jwt expired';
const ErrJWTTokenInvalid = 'invalid token';

const ResponseStatusBaseErr = 1;
const ResponseStatusBaseOk = 0;
const ResponseStatusUnauthorized = 2;
const ResponseStatusExpired = 3;

module.exports = {
  ErrJWTTokenExpired,
  ErrJWTTokenInvalid,
  ResponseStatusBaseErr,
  ResponseStatusBaseOk,
  ResponseStatusUnauthorized,
  ResponseStatusExpired,
};
