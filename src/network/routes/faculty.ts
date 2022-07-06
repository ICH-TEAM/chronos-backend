import { NextFunction, Router } from "express";
import { response } from "network/response";
import { FacultyService } from "services";
import { idSchema, storeFacultySchema, FacultyDTO } from "schemas";
import { validatorCompiler } from "./utils";

const Faculty = Router();

Faculty.route("/faculty")
  .post(
    validatorCompiler(storeFacultySchema, "body"),
    async (
      req: CustomRequest,
      res: CustomResponse,
      next: NextFunction
    ): Promise<void> => {
      try {
        const {
          body: { args },
        } = req;
        const fa = new FacultyService({ facultyDtoWithoutId: args });
        const result = await fa.process({ type: "store" });
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
        const fa = new FacultyService();
        const result = await fa.process({ type: "getAll" });
        response({ error: false, message: result, res, status: 200 });
      } catch (error) {
        next(error);
      }
    }
  );

export { Faculty };
