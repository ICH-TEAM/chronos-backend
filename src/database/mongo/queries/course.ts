import { Document, Types } from "mongoose";
import { Course, CourseDTO } from "schemas";
import { CourseModel } from "../models";

const courseDBOtoDTO = (
  courseDBO: Document<unknown, CourseDBO> & CourseDBO & { _id: Types.ObjectId }
): CourseDTO => ({
  ...courseDBO.toObject(),
  // createdAt: courseDBO.createdAt.toISOString(),
  // updatedAt: courseDBO.updatedAt.toISOString(),
});

const storeCourse = async (courseData: Course): Promise<Course> => {
  const course = new CourseModel(courseData);
  await course.save();
  return courseDBOtoDTO(course);
};

const getCourse = async (
  id: string | null = null
): Promise<CourseDTO[] | CourseDTO | null> => {
  if (id) {
    const course = await CourseModel.findById(id);
    return course ? courseDBOtoDTO(course) : null;
  }
  const courses = await CourseModel.find({});
  return courses.map((c) => courseDBOtoDTO(c));
};

const getCousesByFaculty = async (
  facultyID: string
): Promise<CourseDTO[] | CourseDTO | null> => {
  const courses = await CourseModel.find({ faculty: facultyID }).select([
    "-career",
    "-faculty",
    "-sections",
    "-createdAt",
    "-updatedAt",
  ]);
  return courses.map((c) => courseDBOtoDTO(c));
};

export { storeCourse, getCourse, getCousesByFaculty };
