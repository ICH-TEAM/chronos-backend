import { Document, Types } from "mongoose";
import { Faculty, FacultyDTO } from "schemas";
import { FacultyModel } from "../models/faculty";

const facultyDBOtoDTO = (
  facultyDBO: Document<unknown, FacultyDBO> &
    FacultyDBO & { _id: Types.ObjectId }
): FacultyDTO => ({
  ...facultyDBO.toObject(),
  createdAt: facultyDBO.createdAt.toISOString(),
  updatedAt: facultyDBO.updatedAt.toISOString(),
});

const storeFaculty = async (courseData: Faculty): Promise<Faculty> => {
  const course = new FacultyModel(courseData);
  await course.save();
  return facultyDBOtoDTO(course);
};

const getFaculty = async (
  id: string | null = null
): Promise<FacultyDTO[] | FacultyDTO | null> => {
  if (id) {
    const faculty = await FacultyModel.findById(id);
    return faculty ? facultyDBOtoDTO(faculty) : null;
  }
  const faculties = await FacultyModel.find({});
  return faculties.map((f) => facultyDBOtoDTO(f));
};

export { storeFaculty, getFaculty };
