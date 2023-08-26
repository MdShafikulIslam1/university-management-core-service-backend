import { Building, Prisma } from '@prisma/client';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import prisma from '../../../shared/prisma';
import { IBuildingFilterableFields } from './building.interface';
import { buildingSearchableFields } from './building.constant';

const create = async (data: Building): Promise<Building> => {
  const result = await prisma.building.create({
    data,
  });
  return result;
};
const getAll = async (
  filters: IBuildingFilterableFields,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Building[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  // sorting
  let orderBy = {};
  if (sortBy && sortOrder) {
    orderBy = {
      [sortBy]: sortOrder,
    };
  }
  const andConditions = [];

  // searching;
  if (searchTerm) {
    andConditions.push({
      OR: buildingSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  //filtering
  if (filtersData) {
    const filterKeys = Object.keys(filtersData) as (keyof typeof filtersData)[];
    filterKeys.forEach(key => {
      if (filtersData[key]) {
        const filter: Record<string, unknown> = {};
        filter[key] = { equals: filtersData[key] };
        andConditions.push(filter);
      }
    });
  }
  const whereConditions: Prisma.BuildingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.building.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy,
  });
  const total = await prisma.building.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingle = async (id: string): Promise<Building | null> => {
  const result = await prisma.building.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const deleteOne = async (id: string): Promise<Building | null> => {
  const result = await prisma.building.delete({
    where: {
      id,
    },
  });
  return result;
};
const updateOne = async (
  id: string,
  data: Partial<Building>
): Promise<Building | null> => {
  const result = await prisma.building.update({
    where: {
      id,
    },
    data,
  });
  return result;
};
// MOST DANGEROUS
const deleteAllData = async () => {
  const result = await prisma.building.deleteMany();
  return result;
};
export const BuildingService = {
  create,
  getAll,
  getSingle,
  deleteOne,
  deleteAllData,
  updateOne,
};
