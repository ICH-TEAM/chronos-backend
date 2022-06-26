import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

export type UserDocument = Document & {
    googleId: string;
    name: string;
    lastname: string;
    createdAt: Date;
    updatedAt: Date;
};

const userSchema = new Schema<UserDocument>({
    googleId: String,
    name: String,
    lastname: String,
    createdAt: Date,
    updatedAt: Date,
});

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
