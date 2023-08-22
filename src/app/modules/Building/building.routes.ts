import express from 'express';
import { BuildingController } from './building.controller';
import validateRequest from '../../middlewares/zodValidation';
import { BuildingZodSchema } from './building.validation';
const router = express.Router();
router.post(
  '/create-building',
  validateRequest(BuildingZodSchema.create),
  BuildingController.create
);
export const BuildingRoues = router;
