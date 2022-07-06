import { model, Schema } from 'mongoose'
import { SectionSchema } from './section'
const CourseSchema=new Schema<CourseDBO>({
    code:{
        required:true,
        type:String
    },
    career:{
        required:true,
        type:Schema.Types.ObjectId,
        ref:"careers"
    },
    faculty:{
      required:true,
      type:Schema.Types.ObjectId,
      ref:"faculty"
    },
    name:{
        required:true,
        type:String
    },sections:[SectionSchema]
},
{
  timestamps: true,
  versionKey: false,
  toObject: {
    transform: (_, ret) => {
      ret.id = ret._id.toString()
      delete ret._id
    }
  }
})

const CourseModel = model<CourseDBO>('courses',CourseSchema)

export {CourseModel}