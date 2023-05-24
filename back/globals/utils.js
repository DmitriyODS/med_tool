function MakeSuccessResponse(data) {
  return {
    ok: true,
    description: '',
    data: data,
  };
}

function MakeErrorResponse(description) {
  return {
    ok: false,
    description: description,
    data: null,
  };
}

module.exports = {
  MakeSuccessResponse,
  MakeErrorResponse,
};
