const { User } = require('../models/user');

async function SelectUserByID(id) {

}

async function SelectUserByLoginPass(login, pass) {
  return new User(12);
}

async function InsertUser(user) {

}

async function UpdateUser(user) {

}

async function DeleteUser(id) {

}

module.exports = {
  SelectUserByID,
  SelectUserByLoginPass,
  InsertUser,
  UpdateUser,
  DeleteUser,
};
