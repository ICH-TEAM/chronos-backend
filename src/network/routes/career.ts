import { NextFunction, Router } from "express";
import { response } from "network/response";
import { CareerService } from "services";
import { idSchema, storeCareerSchema, CareerDTO } from "schemas";
import { validatorCompiler } from "./utils";

const Career = Router();

Career.route("/career")
  .post(
    validatorCompiler(storeCareerSchema, "body"),
    async (
      req: CustomRequest,
      res: CustomResponse,
      next: NextFunction
    ): Promise<void> => {
      try {
        const {
          body: { args },
        } = req;
        const ca = new CareerService({ careerDtoWithoutId: args });
        const result = await ca.process({ type: "store" });
        response({ error: false, message: result, res, status: 201 });
      } catch (error) {
        next(error);
      }
    }
  )
  .get(
    async (
      req: CustomRequest,
      res: CustomResponse,
      next: NextFunction
    ): Promise<void> => {
      try {
        const ca = new CareerService();
        const result = await ca.process({ type: "getAll" });
        response({ error: false, message: result, res, status: 200 });
      } catch (error) {
        next(error);
      }
    }
  );

Career.route("/career/:id").get(
  validatorCompiler(idSchema, "params"),
  async (
    req: CustomRequest,
    res: CustomResponse,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        params: { id },
      } = req;
      const cr = new CareerService({ id });
      const result = await cr.process({ type: "getByFaculty" });
      response({ error: false, message: result, res, status: 200 });
    } catch (error) {
      next(error);
    }
  }
);

export { Career };
