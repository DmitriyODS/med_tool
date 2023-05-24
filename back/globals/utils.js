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
  if (!sortStr) {
    return [];
  }

  return sortStr.split(',');
}

function SortArrToQueryStr(sortArr) {
  if (sortArr.length === 0) {
    return '';
  }

  return sortArr
    .map((it) => {
      if (it[0] === '-') {
        return `${it.slice(1)} DESC`;
      }
      return it;
    })
    .join(', ');
}

function FilterArrToQueryStr(filterArr) {
  if (filterArr.length === 0) {
    return '';
  }

  return filterArr
    .map((it) => {
      const [key, value] = it.split(':');
      return `${key}=${value}`;
    })
    .join(' AND ');
}

function MakeFilterArr(filterStr) {
  if (!filterStr) {
    return [];
  }

  return filterStr.split(',');
}

module.exports = {
  MakeSuccessResponse,
  MakeBaseErrorResponse,
  MakeErrorResponse,
  MakeSortArr,
  MakeFilterArr,
  FilterArrToQueryStr,
  SortArrToQueryStr,
};
