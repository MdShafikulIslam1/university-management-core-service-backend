import { z } from 'zod';

const create = z.object({
  body: z.object({
    startDate: z.string({
      required_error: 'Semester start Date is required',
    }),
    endDate: z.string({
      required_error: 'Semester end Date is required',
    }),
    status: z
      .enum(['UPCOMING', 'ONGOING', 'ENDED'], {
        required_error: 'Provide valid status',
      })
      .optional(),
    minCredit: z.number({
      required_error: 'Min credit is required',
    }),
    maxCredit: z.number({
      required_error: 'Max credit is required',
    }),
    academicSemesterId: z.string({
      required_error: 'Academic Semester ID is required',
    }),
  }),
});

export const SemesterRegistrationZodSchema = {
  create,
};
