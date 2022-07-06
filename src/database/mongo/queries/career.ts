import { Document, Types } from "mongoose";
import { Career, CareerDTO } from "schemas";
import { CareerModel } from "../models";

const careerDBOtoDTO = (
  careerDBO: Document<unknown, CareerDBO> & CareerDBO & { _id: Types.ObjectId }
): CareerDTO => ({
  ...careerDBO.toObject(),
  createdAt: careerDBO.createdAt.toISOString(),
  updatedAt: careerDBO.updatedAt.toISOString(),
});

const storeCareer = async (courseData: Career): Promise<Career> => {
  const career = new CareerModel(courseData);
  await career.save();
  return careerDBOtoDTO(career);
};

const getCareer = async (
  id: string | null = null
): Promise<CareerDTO[] | CareerDTO | null> => {
  if (id) {
    const career = await CareerModel.findById(id);
    return career ? careerDBOtoDTO(career) : null;
  }
  const careers = await CareerModel.find({});
  return careers.map((c) => careerDBOtoDTO(c));
};

const getCareerByFaculty = async (
  facultyID: string
): Promise<CareerDTO[] | CareerDTO | null> => {
  const careers = await CareerModel.find({ faculty: facultyID });
  return careers.map((c) => careerDBOtoDTO(c));
};
export { storeCareer, getCareer, getCareerByFaculty };
