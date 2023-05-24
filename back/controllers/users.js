async function GetUserByID(userID) {
  return 'GetUserByID';
}

async function AddUser(user) {
  return 'AddUser';
}

async function UpdateUser(user) {
  return 'UpdateUser';
}

async function DeleteUser(userID) {
  return 'DeleteUser';
}

module.exports = {
  GetUserByID,
  AddUser,
  UpdateUser,
  DeleteUser,
};
