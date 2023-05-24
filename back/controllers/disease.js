async function GetDiseaseListByUserID(curUser, sort, filter) {
  return ['GetDiseaseListByUserID'];
}

async function GetDiseaseByID(curUser, diseaseID) {
  return 'GetDiseaseByID';
}

async function AddDisease(curUser, disease) {
  return 'AddDisease';
}

async function UpdateDisease(curUser, disease) {
  return 'UpdateDisease';
}

async function DeleteDisease(curUser, diseaseID) {
  return 'DeleteDisease';
}

module.exports = {
  GetDiseaseListByUserID,
  GetDiseaseByID,
  AddDisease,
  UpdateDisease,
  DeleteDisease,
};
