const { ResponseStatusBaseErr } = require('./consts');

function MakeSuccessResponse(data) {
  return {
    ok: true,
    status: 0,
    description: '',
    data: data,
  };
}

function MakeBaseErrorResponse(description) {
  return {
    ok: false,
    status: ResponseStatusBaseErr,
    description: description,
    data: null,
  };
}

function MakeErrorResponse(status, description) {
  return {
    ok: false,
    status: status,
    description: description,
    data: null,
  };
}

function MakeSortArr(sortStr) {
  return sortStr.split(',');
}

function MakeFilterObj(filterStr) {
  const filterArr = filterStr.split(',');
  const filterObj = {};
  filterArr.forEach((item) => {
    const [key, value] = item.split(':');
    filterObj[key] = value;
  });

  return filterObj;
}

module.exports = {
  MakeSuccessResponse,
  MakeBaseErrorResponse,
  MakeErrorResponse,
  MakeSortArr,
  MakeFilterObj,
};
