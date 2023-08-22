export type ICourseWithPrerequisite = {
  title: string;
  code: string;
  credits: number;
  prerequisiteCourses?: {
    courseId: string;
  }[];
};
