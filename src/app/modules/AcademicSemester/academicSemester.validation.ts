import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Required',
    }),
    year: z.number({
      required_error: 'Year is Required',
    }),
    code: z.string({
      required_error: 'Code is Required',
    }),
    startMonth: z.string({
      required_error: 'StartMonth is Required',
    }),
    endMonth: z.string({
      required_error: 'EndMonth is Required',
    }),
  }),
});
const update = z.object({
  body: z.object({
    title: z.string().optional(),
    year: z.number().optional(),
    code: z.string().optional(),
    startMonth: z.string().optional(),
    endMonth: z.string().optional(),
  }),
});

export const AcademicSemesterZodSchema = {
  create,
  update,
};
