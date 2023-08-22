import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Required',
    }),
    academicFacultyId: z.string({
      required_error: 'Year is Required',
    }),
  }),
});
export const AcademicDepartmentZodSchema = {
  create,
};
