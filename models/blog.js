import { Schema, model, models } from "mongoose";

const blogSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  keywords: { type: [String], default: [] },
  published: { type: Boolean, default: false },
  createdBy: { type: Schema.Types.ObjectId, ref: "AdminSorme" },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutabale: true,
  },
});

blogSchema.index({ title: "text", content: "text" });

export const BlogSorme = models?.BlogSorme || model("BlogSorme", blogSchema);