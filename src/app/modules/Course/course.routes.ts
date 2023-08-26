import express from 'express';
import { CourseController } from './course.controller';
import validateRequest from '../../middlewares/zodValidation';
import { CourseZodSchema } from './course.validation';
const router = express.Router();
router.post('/create-course', CourseController.create);
router.get('/', CourseController.getAll);
router.delete('/', CourseController.deleteAllData);
router.get('/:id', CourseController.getSingle);
router.delete('/:id', CourseController.deleteOne);
router.patch('/:id', CourseController.updateOne);
router.post(
  '/:id/assign-faculty',
  validateRequest(CourseZodSchema.assignOrRemoveFaculties),
  CourseController.assignFaculty
);
router.delete(
  '/:id/remove-faculty',
  validateRequest(CourseZodSchema.assignOrRemoveFaculties),
  CourseController.removeFaculty
);
export const CourseRoutes = router;
