import { Document, model, models, Schema } from "mongoose";

interface iMail {
  title: string;
  tag: string;
  message: string;
  read: string[];
  user: {};
  userID: string;
}

interface iMailData extends iMail, Document {}

const mailSchema = new Schema(
  {
    read: { type: [] },
    title: { type: String },
    userID: { type: String },
    tag: { type: String },
    message: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

const mailModel = models.mails || model<iMailData>("mails", mailSchema);

export default mailModel;
