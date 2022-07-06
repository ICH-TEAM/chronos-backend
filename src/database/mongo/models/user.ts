import { model, Schema } from 'mongoose'

const UserSchema = new Schema<UserDBO>(
  {
    lastName: {
      required: true,
      type: String
    },
    name: {
      required: true,
      type: String
    },
    email: {
      required: true,
      type: String
    },
    password: {
      require: true,
      type: String
    },
    faculty: {
      require: true,
      type: Schema.Types.ObjectId,
      ref: "faculty"
    },
    career: {
      require: true,
      type: Schema.Types.ObjectId,
      ref: "careers"
    },
    courses: [{
      require: true,
      type: Schema.Types.ObjectId,
      ref: "courses"
    }]
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
  }
)

const UserModel = model<UserDBO>('users', UserSchema)

export { UserModel }
