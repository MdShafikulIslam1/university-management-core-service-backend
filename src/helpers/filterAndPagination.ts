/* eslint-disable @typescript-eslint/no-explicit-any */
import { paginationHelpers } from './paginationHelpers';

type FilterAndPaginationResult<X, Y, Z, W> = {
  whereCondition: X;
  page: Y;
  skip: Z;
  limit: number;
  sortCondition: W;
};

const filterAndPagination = <X, Y, Z, W>(
  filters: Record<string, any>,
  paginationOptions: Record<string, any>,
  searchableFields: string[]
): FilterAndPaginationResult<X, Y, Z, W> => {
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: searchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const sortCondition: { [key: string]: string } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  return {
    whereCondition: whereCondition as X,
    page: page as Y,
    skip: skip as Z,
    limit,
    sortCondition: sortCondition as W,
  };
};

export default filterAndPagination;
