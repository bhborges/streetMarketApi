const defaultPageSize = 10;
export default async function FindAndCountAll(
  Entity,
  options,
  page = 0,
  ignorePagination
) {
  const pageSize = defaultPageSize;
  let resultQuery = {};
  const optionsToQuery = {
    ...options,
  };
  if (!ignorePagination) {
    optionsToQuery.limit = pageSize;
    optionsToQuery.offset = page * pageSize;
    optionsToQuery.pageSize = pageSize;
    optionsToQuery.distinct = true;
  }

  const result = await Entity.findAndCountAll(optionsToQuery);
  resultQuery = {
    items: result.rows,
    page: parseInt(page),
    pageSize,
    pages: Math.ceil(result.count / pageSize),
    count: result.count,
  };
  if (options.group && options.group.length > 0) {
    const count = await Entity.count({
      ...options,
    });
    resultQuery = {
      ...resultQuery,
      pages: !ignorePagination ? Math.ceil(count.length / pageSize) : 1,
      count: count.length,
    };
  }

  return resultQuery;
}
