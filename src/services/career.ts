import httpErrors from "http-errors";
import { storeCareer, getCareer, getCareerByFaculty } from "database";
import { CareerDTO } from "schemas";

import { EFU, MFU, GE, errorHandling } from "./utils";

type Process = {
  type:
    | "store"
    | "getAll"
    | "deleteAll"
    | "getOne"
    | "update"
    | "delete"
    | "getByFaculty";
};

type Arguments = {
  id?: string;
  careerDTO?: CareerDTO;
  careerDtoWithoutId?: Omit<CareerDTO, "id">;
};

class CareerService {
  #args: Arguments;
  constructor(args: Arguments = {}) {
    this.#args = args;
  }
  public process({ type }: Process): Promise<string | CareerDTO | CareerDTO[]> {
    switch (type) {
      case "store":
        return this.#store();
      case "getAll":
        return this.#getAll();
      case "getByFaculty":
        return this.#getByFaculty();
      default:
        throw new httpErrors.InternalServerError(GE.INTERNAL_SERVER_ERROR);
    }
  }
  async #store(): Promise<CareerDTO> {
    try {
      if (!this.#args.careerDtoWithoutId)
        throw new httpErrors.UnprocessableEntity(GE.INTERNAL_SERVER_ERROR);

      const result = await storeCareer({ ...this.#args.careerDtoWithoutId });
      return result;
    } catch (error) {
      return errorHandling(error, GE.INTERNAL_SERVER_ERROR);
    }
  }

  async #getAll(): Promise<CareerDTO[]> {
    try {
      const careers = (await getCareer()) as CareerDTO[];
      return careers;
    } catch (error) {
      return errorHandling(error, GE.INTERNAL_SERVER_ERROR);
    }
  }

  async #getByFaculty(): Promise<CareerDTO[]> {
    try {
      if (!this.#args.id)
        throw new httpErrors.UnprocessableEntity(GE.INTERNAL_SERVER_ERROR);

      const careers = (await getCareerByFaculty(
        this.#args.id
      )) as CareerDTO[];
      return careers;
    } catch (error) {
      return errorHandling(error, GE.INTERNAL_SERVER_ERROR);
    }
  }
}

export { CareerService };
