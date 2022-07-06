import { Static, Type } from "@sinclair/typebox";

import { id } from ".";

const faculty = Type.Object({
  name: Type.String(),
});

type Faculty = Static<typeof faculty>;

const facultyDto = Type.Object({
  id: Type.Optional(id),
  name: Type.String(),
  createdAt: Type.Optional(Type.String()),
  updatedAt: Type.Optional(Type.String()),
});

type FacultyDTO = Static<typeof facultyDto>;

const storeFacultySchema = Type.Object({
  args: faculty,
});

type storeFaculty = Static<typeof storeFacultySchema>;

export { Faculty, FacultyDTO, storeFaculty, storeFacultySchema };
