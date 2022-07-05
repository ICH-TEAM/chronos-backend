import { NextFunction, Router } from "express";
import { response } from "network/response";
import { CourseService } from "services/course";
import { idSchema, storeCourseSchema, CourseDTO } from "schemas";
import { validatorCompiler } from "./utils";


const Course = Router();

Course.route("/course")
  .post(
    validatorCompiler(storeCourseSchema, "body"),
    async (
      req: CustomRequest,
      res: CustomResponse,
      next: NextFunction
    ): Promise<void> => {
      try {
        const {
          body: { args },
        } = req;
        const co = new CourseService({ courseDtoWithoutId: args });
        const result = await co.process({ type: "store" });
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
        const co=new CourseService()
        const result=await co.process({type:'getAll'})
        response({error:false,message:result,res,status:200})
      } catch (error) {
        next(error)
      }
    }
  );

Course.route("/course/:id")
.get(
  validatorCompiler(idSchema,'params'),
  async(
    req:CustomRequest,
    res:CustomResponse,
    next:NextFunction
  ):Promise<void>=>{
    try {
      const {params:{id}}=req
      const cs = new CourseService({id})
      const result = await cs.process({type:'getOne'})
      response({error:false,message:result,res,status:200})

    } catch (error) {
      next(error)
    }
  }
)


  export {Course}