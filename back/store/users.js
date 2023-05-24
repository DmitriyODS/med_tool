const { User } = require('../models/user');
const { db } = require('./store');

const sqlSelectUserByID = `
SELECT id,
       "login",
       fio,
       birthday,
       height,
       gender,
       date_created
FROM user_data.users
WHERE id = $1;
`;

const sqlSelectUserByLoginPass = `
SELECT id,
       "login",
       fio,
       birthday,
       height,
       gender,
       date_created
FROM user_data.users
WHERE "login" = $1
  AND hash_pass = crypt($2, hash_pass);
`;

const sqlInsertUser = `
INSERT INTO user_data.users("login",
                            hash_pass,
                            fio,
                            birthday,
                            height,
                            gender)
VALUES ($1, crypt($2, gen_salt('bf')), $3, $4, $5, $6)
RETURNING id;
`;

const sqlUpdateUser = `
UPDATE user_data.users
SET fio=$1,
    height=$2
WHERE id = $3
RETURNING id;
`;

const sqlDeleteUser = `
DELETE
FROM user_data.users
WHERE id = $1;
`;

async function SelectUserByID(userID) {
  const user = new User();

  try {
    const data = await db.one(sqlSelectUserByID, [userID]);
    user.placeholderSelect(data);
  } catch (err) {
    console.log(err.message);
  }

  return user;
}

async function SelectUserByLoginPass(login, pass) {
  const user = new User();

  try {
    const data = await db.one(sqlSelectUserByLoginPass, [login, pass]);
    user.placeholderSelect(data);
  } catch (err) {
    console.log(err.message);
  }

  return user;
}

async function InsertUser(user) {
  try {
    return await db.one(sqlInsertUser, user.placeholderInsert());
  } catch (err) {
    console.log(err.message);
  }

  return 0;
}

async function UpdateUser(userID, user) {
  // ещё раз подтверждаем, что перед нами тот самый пользователь
  user.id = userID;

  try {
    return await db.one(sqlUpdateUser, user.placeholderUpdate());
  } catch (err) {
    console.log(err.message);
  }

  return 0;
}

async function DeleteUser(userID) {
  try {
    const result = await db.result(sqlDeleteUser, [userID]);
    return result.rowCount;
  } catch (err) {
    console.log(err.message);
  }

  return 0;
}

module.exports = {
  SelectUserByID,
  SelectUserByLoginPass,
  InsertUser,
  UpdateUser,
  DeleteUser,
};
