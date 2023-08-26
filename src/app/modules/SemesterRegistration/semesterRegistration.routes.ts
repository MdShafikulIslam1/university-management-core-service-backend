import express from 'express';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import validateRequest from '../../middlewares/zodValidation';
import { SemesterRegistrationZodSchema } from './semesterRegistration.validation';
const router = express.Router();
router.post(
  '/create-semesterRegistration',
  validateRequest(SemesterRegistrationZodSchema.create),
  SemesterRegistrationController.create
);
router.get('/', SemesterRegistrationController.getAll);
router.delete('/', SemesterRegistrationController.deleteAllData);
router.get('/:id', SemesterRegistrationController.getSingle);
router.patch('/:id', SemesterRegistrationController.updateOne);
router.delete('/:id', SemesterRegistrationController.deleteOne);

export const SemesterRegistrationRoutes = router;
