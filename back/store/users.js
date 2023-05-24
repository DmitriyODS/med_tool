const { User } = require('../models/user');

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

async function SelectUserByID(userID) {}

async function SelectUserByLoginPass(login, pass) {
  return new User(12);
}

async function InsertUser(user) {}

async function UpdateUser(userID, user) {}

async function DeleteUser(userID) {}

module.exports = {
  SelectUserByID,
  SelectUserByLoginPass,
  InsertUser,
  UpdateUser,
  DeleteUser,
};
