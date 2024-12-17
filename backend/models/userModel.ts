import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

interface IAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  country: string;
  isPrimary?: boolean;
}

interface IUser extends Document {
  _id: string | mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  image: string;
  phone: string;
  addresses: IAddress[];
  selectedAddress?: mongoose.Schema.Types.ObjectId;
  lastLogin: Date;
  resetPasswordToken: string;
  resetPasswordExpires: Date;
  isAdmin: boolean;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const addressSchema = new Schema<IAddress>(
  {
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  }
);

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    addresses: [addressSchema],
    selectedAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: false,
    },
    lastLogin: {
      type: Date,
      required: false,
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },
    resetPasswordExpires: {
      type: Date,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  this.email = this.email.toLowerCase();
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model<IUser>("User", userSchema);

export { IUser };
export default User;
