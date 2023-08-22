import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/zodValidation';
import { StudentZodSchema } from './student.validation';
const router = express.Router();
router.post(
  '/create-student',
  validateRequest(StudentZodSchema.create),
  StudentController.create
);
router.get('/', StudentController.getAll);
router.get('/:id', StudentController.getSingle);
export const StudentRoutes = router;
