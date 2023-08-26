export type ICourseWithPrerequisite = {
  title: string;
  code: string;
  credits: number;
  prerequisiteCourses?: {
    courseId: string;
    isDeleted?: null;
  }[];
};
export type ICourseFilterableFields = {
  searchTerm?: string;
  title?: string;
  code?: string;
  credits?: string;
};
