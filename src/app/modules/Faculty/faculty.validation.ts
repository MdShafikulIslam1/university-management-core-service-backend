import { z } from 'zod';

const create = z.object({
  body: z.object({
    facultyId: z.string({
      required_error: 'Faculty ID is required',
    }),
    firstName: z.string({
      required_error: 'First Name is required',
    }),
    lastName: z.string({
      required_error: 'Last Name is required',
    }),
    middleName: z.string({
      required_error: 'Middle Name is required',
    }),
    dateOfBirth: z.string({
      required_error: 'Date of Birth is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    profileImage: z.string({
      required_error: 'Profile Image is required',
    }),
    contactNo: z.string({
      required_error: 'Contact Number is required',
    }),
    gender: z.string({
      required_error: 'Gender is required',
    }),
    designation: z.string({
      required_error: 'Designation is required',
    }),
    academicFacultyId: z.string({
      required_error: 'Academic Faculty ID is required',
    }),
    academicDepartmentId: z.string({
      required_error: 'Academic Department ID is required',
    }),
  }),
});

const assignOrRemoveCourse = z.object({
  body: z.object({
    courses: z.array(z.string(), {
      required_error: 'Courses is required',
    }),
  }),
});

export const FacultyZodSchema = {
  create,
  assignOrRemoveCourse,
};
