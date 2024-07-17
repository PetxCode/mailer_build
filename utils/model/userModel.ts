import { Document, model, models, Schema } from "mongoose";

interface iUser {
  name: string;
  email: string;
  role: string;
  clerkID: string;
  mail: {}[];
}

interface iUserData extends iUser, Document {}

const userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    role: { type: String },
    clerkID: { type: String },
    mail: [{ type: Schema.Types.ObjectId, ref: "mails" }],
  },
  { timestamps: true }
);

const userModel = models.users || model<iUserData>("users", userSchema);

export default userModel;
