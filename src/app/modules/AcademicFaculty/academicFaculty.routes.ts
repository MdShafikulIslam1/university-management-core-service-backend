import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlewares/zodValidation';
import { AcademicFacultyZodSchema } from './academicFaculty.validation';
const router = express.Router();
router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyZodSchema.create),
  AcademicFacultyController.create
);
router.get('/', AcademicFacultyController.getAll);
router.get('/:id', AcademicFacultyController.getSingle);
router.delete('/', AcademicFacultyController.deleteAllData);
router.delete('/:id', AcademicFacultyController.deleteOne);
router.patch(
  '/:id',
  validateRequest(AcademicFacultyZodSchema.update),
  AcademicFacultyController.updateOne
);
export const AcademicFacultyRoutes = router;
