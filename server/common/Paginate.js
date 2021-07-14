export default (page, limit) => ({
  offset: page * limit,
  limit,
});
