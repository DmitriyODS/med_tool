const {
  StatusDiseaseChronic,
  StatusDiseaseSick,
  StatusDiseaseCured,
} = require('../globals/consts');

class Disease {
  constructor(
    id = 0,
    userID = 0,
    name = '',
    info = '',
    status = '',
    dateStart = new Date(),
    dateEnd = new Date()
  ) {
    this.id = id;
    this.userID = userID;
    this.name = name;
    this.info = info;
    this.status = status;
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
  }

  validate(isCreate = false) {
    if (!isCreate) {
      if (!this.id || this.id <= 0) {
        return 'запись не найдена';
      }
    }

    if (!this.userID || this.userID <= 0) {
      return 'пользователь не указан';
    }

    if (!this.name) {
      return 'название не задано';
    }

    if (!this.info) {
      return 'информация должна быть указана';
    }

    if (!this.status) {
      return 'текущий статус болезни не указан';
    }

    if (
      this.status !== StatusDiseaseChronic &&
      this.status !== StatusDiseaseSick &&
      this.status !== StatusDiseaseCured
    ) {
      return 'не верно указан статус болезни, возможные статусы: "Болен", "Вылечился", "Хроническая"';
    }

    return '';
  }

  placeholderSelect(sqlRow) {
    this.id = sqlRow.id;
    this.userID = sqlRow.user_id;
    this.name = sqlRow.name;
    this.status = sqlRow.status;
    this.dateStart = sqlRow.date_start;
    this.dateEnd = sqlRow.date_end;
    this.info = sqlRow.info;
  }

  placeholderInsert() {
    return [this.userID, this.name, this.status, this.dateStart, this.dateEnd, this.info];
  }

  placeholderUpdate() {
    return [this.name, this.status, this.dateStart, this.dateEnd, this.info, this.id, this.userID];
  }
}

function MakeDiseaseFromJsonData(data) {
  const disease = new Disease();

  disease.id = data.id;
  disease.userID = data.userID;
  disease.name = data.name;
  disease.info = data.info;
  disease.statusID = data.statusID;
  disease.statusName = data.statusName;
  disease.dateStart = new Date(data.dateStart * 1000);
  disease.dateEnd = new Date(data.dateEnd * 1000);

  return disease;
}

module.exports = {
  Disease,
  MakeDiseaseFromJsonData,
};
