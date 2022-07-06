import { model, Schema } from "mongoose";

const FacultySchema = new Schema<FacultyDBO>(
  {
    name: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toObject: {
      transform: (_, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
      },
    },
  }
);

const FacultyModel = model<FacultyDBO>("faculty", FacultySchema);

export { FacultyModel };
