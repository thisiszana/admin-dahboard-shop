import { Schema, models, model } from "mongoose";

const adminSormeSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, default: "" },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, default: "" },
    phoneNumber: { type: String, default: "" },
    address: { type: String, default: "" },
    country: { type: String, default: "" },
    image: { type: String, default: "" },
    roll: { type: String, default: "USER" },
    productsCreated: [
      { type: Schema.Types.ObjectId, ref: "ProductAdminSorme" },
    ],
    categoryCreated: [
      { type: Schema.Types.ObjectId, ref: "CategorySorme" },
    ],
    blogsCreated: [{ type: Schema.Types.ObjectId, ref: "BlogSorme" }],
    gender: {
      type: String,
      enum: ["man", "female", "etc"],
      default: "",
    },
  },
  { timestamps: true }
);

adminSormeSchema.index({ username: "text", firstName: "text" });

const AdminSorme = models?.AdminSorme || model("AdminSorme", adminSormeSchema);
export default AdminSorme;
