import {  Schema } from 'mongoose'

const ScheduleSchema = new Schema<Schedule>({
    from:{
        required: true,
      type: Number
    },
    to:{
        required: true,
      type: Number
    },
    day:{
        required: true,
      type: Number
    },teacher:{
        required: true,
      type: String
    },_id:false
})

export {ScheduleSchema}
