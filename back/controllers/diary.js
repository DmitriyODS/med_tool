async function GetDiaryListByUserID(curUser, sort, filter) {
  return ['GetDiaryListByUserID'];
}

async function GetDiaryByID(curUser, diaryID) {
  return 'GetDiaryByID';
}

async function AddDiary(curUser, diary) {
  return 'AddDiary';
}

async function UpdateDiary(curUser, diary) {
  return 'UpdateDiary';
}

async function DeleteDiary(curUser, diaryID) {
  return 'DeleteDiary';
}

module.exports = {
  GetDiaryListByUserID,
  GetDiaryByID,
  AddDiary,
  UpdateDiary,
  DeleteDiary,
};
