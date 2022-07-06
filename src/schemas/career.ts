import { Static, Type } from "@sinclair/typebox";

import { id } from ".";

const career = Type.Object({
  name: Type.String(),
  faculty: Type.String(),
});

type Career = Static<typeof career>;

const careerDto = Type.Object({
  id: Type.Optional(id),
  name: Type.String(),
  faculty: Type.String(),
  createdAt: Type.Optional(Type.String()),
  updatedAt: Type.Optional(Type.String()),
});

type CareerDTO = Static<typeof careerDto>;

const storeCareerSchema = Type.Object({
  args: career,
});

type storeCareer = Static<typeof storeCareerSchema>;

export { Career, CareerDTO, storeCareer, storeCareerSchema };
