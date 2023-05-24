class Disease {
  constructor(id = 0, userID = 0, name = '',
              info = '', status = { id: 0, name: '' },
              dateStart = new Date(), dateEnd = new Date()) {
    this.id = id;
    this.userID = userID;
    this.name = name;
    this.info = info;
    this.statusID = statusID;
    this.statusName = statusName;
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
  }

  validate() {
    return true;
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
