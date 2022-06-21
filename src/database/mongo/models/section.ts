import {  Schema } from 'mongoose'
import {ScheduleSchema} from './schedule'

const SectionSchema = new Schema<Section>({
    section:{
        required: true,
      type: String
    },
    times:[ScheduleSchema],
    _id:false
})

export {SectionSchema}