import express from 'express';
import validateRequest from '../../middlewares/zodValidation';
import { AcademicDepartmentZodSchema } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';
const router = express.Router();
router.post(
  '/create-academic-department',
  validateRequest(AcademicDepartmentZodSchema.create),
  AcademicDepartmentController.create
);
router.get('/', AcademicDepartmentController.getAll);
router.get('/:id', AcademicDepartmentController.getSingle);
export const AcademicDepartmentRoutes = router;
