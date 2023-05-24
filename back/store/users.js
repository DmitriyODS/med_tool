const { User } = require('../models/user');

async function SelectUserByID(userID) {

}

async function SelectUserByLoginPass(login, pass) {
  return new User(12);
}

async function InsertUser(user) {

}

async function UpdateUser(userID, user) {

}

async function DeleteUser(userID) {

}

module.exports = {
  SelectUserByID,
  SelectUserByLoginPass,
  InsertUser,
  UpdateUser,
  DeleteUser,
};
