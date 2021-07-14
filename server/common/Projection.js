export default (select, extra = []) => {
  if (select) {
    return select
      .split(',')
      .filter((field) => !field.includes('.'))
      .concat(extra);
  }

  return null;
};
