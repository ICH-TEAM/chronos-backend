import { model, Schema } from "mongoose";

const CareerSchema = new Schema<CareerDBO>(
  {
    name: {
      required: true,
      type: String,
    },
    faculty: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "faculty",
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

const CareerModel = model<CareerDBO>("careers", CareerSchema);

export { CareerModel };
