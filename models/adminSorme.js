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
    gender: {
      type: String,
      enum: ["man", "female", "etc"],
      default: "",
    },
  },
  { timestamps: true }
);

const AdminSorme = models?.AdminSorme || model("AdminSorme", adminSormeSchema);
export default AdminSorme;
