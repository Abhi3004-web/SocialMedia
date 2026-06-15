import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * User Interface
 */
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;

  avatar: {
    url: string;
    publicId: string;
  };

  bio?: string;
  isVerified: boolean;
  role: "USER" | "ADMIN";
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
  verificationToken?: string;
  resetPasswordToken?: string;
  createdAt: Date;
  updatedAt: Date;
}


/**
 * User Schema
 */
const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false // hide password by default
    },

    avatar: {
      url: {
        type: String,
        default: ""
      },

      publicId: {
        type: String,
        default: ""
      }
    },

    bio: {
      type: String,
      maxlength: 150,
      default: ""
    },

    isVerified: {
      type: Boolean,
      default: false
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER"
    },

    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    verificationToken: {
      type: String,
      default: null
    },

    resetPasswordToken: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);


/**
 * Database Indexes
 */
UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });


/**
 * Export Model
 */
const User: Model<IUser> =
  mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);

export default User;