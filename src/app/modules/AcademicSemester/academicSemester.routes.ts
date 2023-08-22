import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlewares/zodValidation';
import { AcademicSemesterZodSchema } from './academicSemester.validation';
const router = express.Router();
router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterZodSchema.create),
  AcademicSemesterController.create
);
router.get('/', AcademicSemesterController.getAll);
router.delete('/', AcademicSemesterController.deleteAllData);
router.get('/:id', AcademicSemesterController.getSingle);
export const AcademicSemesterRoutes = router;
