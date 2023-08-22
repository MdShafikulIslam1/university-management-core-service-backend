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
router.get('/:id', FacultyController.getSingle);
export const FacultyRoutes = router;
