const ErrJWTTokenExpired = 'jwt expired';
const ErrJWTTokenInvalid = 'invalid token';

const ResponseStatusBaseErr = 1;
const ResponseStatusBaseOk = 0;
const ResponseStatusUnauthorized = 2;
const ResponseStatusExpired = 3;

const GenderMale = 'Мужской';
const GenderFemale = 'Женский';

const TypeDayMorning = 'Утро';
const TypeDayDay = 'День';
const TypeDayEvening = 'Вечер';

const StatusDiseaseChronic = 'Хроническая';
const StatusDiseaseCured = 'Вылечился';
const StatusDiseaseSick = 'Болен';

module.exports = {
  ErrJWTTokenExpired,
  ErrJWTTokenInvalid,

  ResponseStatusBaseErr,
  ResponseStatusBaseOk,
  ResponseStatusUnauthorized,
  ResponseStatusExpired,

  GenderFemale,
  GenderMale,

  TypeDayMorning,
  TypeDayDay,
  TypeDayEvening,

  StatusDiseaseSick,
  StatusDiseaseCured,
  StatusDiseaseChronic,
};
