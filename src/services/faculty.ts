import httpErrors from "http-errors";
import { storeFaculty, getFaculty } from "database";
import { FacultyDTO } from "schemas";

import { EFU, MFU, GE, errorHandling } from "./utils";

type Process = {
  type: "store" | "getAll" | "deleteAll" | "getOne" | "update" | "delete";
};

type Arguments = {
  id?: string;
  facultyDto?: FacultyDTO;
  facultyDtoWithoutId?: Omit<FacultyDTO, "id">;
};

class FacultyService {
  #args: Arguments;
  constructor(args: Arguments = {}) {
    this.#args = args;
  }
  public process({
    type,
  }: Process): Promise<string | FacultyDTO | FacultyDTO[]> {
    switch (type) {
      case "store":
        return this.#store();
      case "getAll":
        return this.#getAll();
      default:
        throw new httpErrors.InternalServerError(GE.INTERNAL_SERVER_ERROR);
    }
  }
  async #store(): Promise<FacultyDTO> {
    try {
      if (!this.#args.facultyDtoWithoutId)
        throw new httpErrors.UnprocessableEntity(GE.INTERNAL_SERVER_ERROR);

      const result = await storeFaculty({ ...this.#args.facultyDtoWithoutId });
      return result;
    } catch (error) {
      return errorHandling(error, GE.INTERNAL_SERVER_ERROR);
    }
  }

  async #getAll(): Promise<FacultyDTO[]> {
    try {
      const faculties = (await getFaculty()) as FacultyDTO[];
      return faculties;
    } catch (error) {
      return errorHandling(error, GE.INTERNAL_SERVER_ERROR);
    }
  }
}

export { FacultyService };
