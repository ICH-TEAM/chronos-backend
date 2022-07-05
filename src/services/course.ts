import httpErrors from 'http-errors'

import { storeCourse,getCourse } from 'database'
import { CourseDTO } from 'schemas'
import { EFU, MFU, GE, errorHandling } from './utils'

type Process = {
    type: 'store' | 'getAll' | 'deleteAll' | 'getOne' | 'update' | 'delete'
  }

type Arguments={
    id?:string
    courseDto?:CourseDTO
    courseDtoWithoutId?: Omit<CourseDTO,'id'>
}

class CourseService{
    #args:Arguments
    constructor(args:Arguments={}){
        this.#args=args
    }

public process({type}:Process):Promise<string|CourseDTO|CourseDTO[]>{
    switch (type) {
        case 'store':
            return this.#store()
        case 'getAll':
            return this.#getAll()
        case 'getOne':
            return this.#getOne()
        default:
            throw new httpErrors.InternalServerError(GE.INTERNAL_SERVER_ERROR)
    }
}


async #store():Promise<CourseDTO>{
    try {
        if(!this.#args.courseDtoWithoutId)
            throw new httpErrors.UnprocessableEntity(GE.INTERNAL_SERVER_ERROR)
        
            const result=await storeCourse({...this.#args.courseDtoWithoutId})
            return result
    } catch (error) {
        return errorHandling(error, GE.INTERNAL_SERVER_ERROR)  
    }
}

async #getAll():Promise<CourseDTO[]>{
    try{
        const courses=(await getCourse()) as CourseDTO[]
        return courses
    }catch(error){
        return errorHandling(error, GE.INTERNAL_SERVER_ERROR)
    }
}

async #getOne():Promise<CourseDTO>{
    try {
        if(!this.#args.id){
            throw new httpErrors.UnprocessableEntity(GE.INTERNAL_SERVER_ERROR)
        }
        const {id}=this.#args
        const user = (await getCourse(id)) as CourseDTO | null

        if(!user) throw new httpErrors.NotFound(EFU.NOT_FOUND)
        return user

    } catch (error) {
        return errorHandling(error,GE.INTERNAL_SERVER_ERROR)
    }
}


}

export {CourseService}