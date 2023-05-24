async function GetDiseaseListByUserID(userID) {
  return ['GetDiseaseListByUserID'];
}

async function GetDiseaseByID(diseaseID) {
  return 'GetDiseaseByID';
}

async function AddDisease(disease) {
  return 'AddDisease';
}

async function UpdateDisease(disease) {
  return 'UpdateDisease';
}

async function DeleteDisease(diseaseID) {
  return 'DeleteDisease';
}

module.exports = {
  GetDiseaseListByUserID,
  GetDiseaseByID,
  AddDisease,
  UpdateDisease,
  DeleteDisease,
};
