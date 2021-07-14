exports.asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

exports.setNullToEmptyValues = (value) => {
  return value === '' ? null : value;
};

exports.filterPasswordLog = (body) => {
  const userPassword = '***filtered***';
  return body.userPassword
    ? JSON.stringify({ ...body, userPassword })
    : JSON.stringify(body);
};
