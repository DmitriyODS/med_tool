class Disease {
  constructor(
    id = 0,
    userID = 0,
    name = '',
    info = '',
    status = { id: 0, name: '' },
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
      if (this.id <= 0) {
        return 'запись не найдена';
      }
    }

    if (this.userID <= 0) {
      return 'пользователь не указан';
    }

    if (this.name === '') {
      return 'название не задано';
    }

    if (this.info === '') {
      return 'информация должна быть указана';
    }

    if (this.status.id <= 0) {
      return 'текущий статус болезни не указан';
    }

    if (this.dateStart.getTime() === 0) {
      return 'дата начала не задана';
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
  disease.dateStart = data.dateStart;
  disease.dateEnd = data.dateEnd;

  return disease;
}

module.exports = {
  Disease,
  MakeDiseaseFromJsonData,
};
