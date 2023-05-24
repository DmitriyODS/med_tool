async function SelectDiseaseListByUserID(userID, sorts, filters, offset, limit) {
  return {
    count: 0,
    rows: [],
  };
}

async function SelectDiseaseByID(userID, diaryID) {
  return {};
}

async function InsertDisease(diary) {
  return 0;
}

async function UpdateDisease(userID, diary) {
  return 0;
}

async function DeleteDisease(userID, diaryID) {
  return 0;
}

module.exports = {
  SelectDiseaseListByUserID,
  SelectDiseaseByID,
  InsertDisease,
  UpdateDisease,
  DeleteDisease,
};
