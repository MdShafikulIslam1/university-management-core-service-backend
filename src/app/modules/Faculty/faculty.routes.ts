import express from 'express';
import { FacultyController } from './faculty.controller';
import validateRequest from '../../middlewares/zodValidation';
import { FacultyZodSchema } from './faculty.validation';
const router = express.Router();
router.post(
  '/create-faculty',
  validateRequest(FacultyZodSchema.create),
  FacultyController.create
);
router.get('/', FacultyController.getAll);
router.delete('/', FacultyController.deleteAllData);
router.get('/:id', FacultyController.getSingle);
router.delete('/:id', FacultyController.deleteOne);
router.patch('/:id', FacultyController.updateOne);
router.post(
  '/:id/assign-course',
  validateRequest(FacultyZodSchema.assignOrRemoveCourse),
  FacultyController.assignCourse
);
router.delete(
  '/:id/remove-course',
  validateRequest(FacultyZodSchema.assignOrRemoveCourse),
  FacultyController.removeCourse
);
export const FacultyRoutes = router;
