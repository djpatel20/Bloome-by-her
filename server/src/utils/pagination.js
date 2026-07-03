export function parsePagination(query, defaultPageSize = 12) {
  const page = Math.max(1, Number(query.page) || 1)
  const pageSize = Math.max(1, Number(query.pageSize) || defaultPageSize)
  const skip = (page - 1) * pageSize
  return { page, pageSize, skip }
}

export function buildPaginatedResult(items, total, page, pageSize) {
  return {
    items,
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  }
}
