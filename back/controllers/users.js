async function GetUserByID(curUser) {
  return 'GetUserByID';
}

async function AddUser(user) {
  return 'AddUser';
}

async function UpdateUser(curUser, user) {
  return 'UpdateUser';
}

async function DeleteUser(curUser, userID) {
  return 'DeleteUser';
}

module.exports = {
  GetUserByID,
  AddUser,
  UpdateUser,
  DeleteUser,
};
