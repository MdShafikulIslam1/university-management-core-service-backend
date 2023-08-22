import express from 'express';
import { CourseController } from './course.controller';
const router = express.Router();
router.post('/create-course', CourseController.create);
export const CourseRoutes = router;
