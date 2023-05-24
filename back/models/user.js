class User {
  constructor(id = 0, fio = '', birthday = new Date(),
              height = 0, dateCreate = new Date(),
              gender = { id: 0, name: '' }) {
    this.id = id;
    this.fio = fio;
    this.birthday = birthday;
    this.height = height;
    this.dateCreate = dateCreate;
    this.gender = gender;
  }

  validate() {
    return true;
  }
}

function MakeUserFromJsonData(jsonData) {
  const user = new User();

  user.id = jsonData.id;
  user.fio = jsonData.fio;
  user.birthday = jsonData.birthday;
  user.height = jsonData.height;
  user.dateCreate = jsonData.dateCreate;
  user.gender = jsonData.gender;

  return user;
}

module.exports = {
  User,
  MakeUserFromJsonData,
};
