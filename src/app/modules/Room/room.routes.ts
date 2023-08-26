import express from 'express';
import { RoomController } from './room.controller';
import validateRequest from '../../middlewares/zodValidation';
import { RoomZodSchema } from './room.validation';
const router = express.Router();
router.post(
  '/create-room',
  validateRequest(RoomZodSchema.create),
  RoomController.create
);

router.get('/', RoomController.getAll);
router.delete('/', RoomController.deleteAllData);
router.get('/:id', RoomController.getSingle);
router.patch('/:id', RoomController.updateOne);
router.delete('/:id', RoomController.deleteOne);
export const RoomRoutes = router;
