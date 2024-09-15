import { Schema, models, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    icon: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "AdminSorme" },
    createdAt: {
      type: Date,
      default: () => Date.now(),
      immutabale: true,
    },
  },
  { timestamps: true }
);

const CategorySorme =
  models.CategorySorme || model("CategorySorme", categorySchema);

export default CategorySorme;
