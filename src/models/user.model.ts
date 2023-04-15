import mongoose, { CallbackError, Document, Model, Schema } from 'mongoose';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import moment from 'moment';

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
//@ts-ignore
import multer from 'multer';

import { env, expirationInterval, accessSecret } from 'config/vars';

export enum Role {
  PROF = 'professor',
  STUDENT = 'student',
  ADMIN = 'admin',
}

export const roles = [Role.PROF, Role.STUDENT, Role.ADMIN];

interface IBaseUserData {
  firstName: string;
  lastName: string;
  email: string;
  emailPer: string;
  telephone: string;
  birthday: Date;
  gender: string;
  address: string;
  password: string;
  role: Role;
  image?: string;
}

interface IBaseUser extends Document, IBaseUserData {}

interface IStudentData {
  fatherFullName: string;
  motherFullName: string;
  fatherJob: string;
  motherJob: string;
}

interface IStudent extends IBaseUser, IStudentData {}

interface IProfessorData {
  hourlyPrice: number;
  hoursNbr: number;
  diploma: string;
  available: string;
}

interface IProfessor extends IBaseUser, IProfessorData {}
export interface UserDocument extends Document, IStudent, IProfessor {
  generateToken: () => { token: string; expiresIn: string };
  passwordMatches: (password: string) => Promise<boolean>;
}

export type UserModel = Model<UserDocument>;

const UserSchema = new mongoose.Schema<UserDocument, UserModel>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    emailPer: { type: String, required: true },
    telephone: { type: String, required: true },
    birthday: { type: Date, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    images: { type: String, default: null },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: roles,
      required: true,
    },
    fatherFullName: { type: String, default: null },
    motherFullName: { type: String, default: null },
    fatherJob: { type: String, default: null },
    motherJob: { type: String, default: null },
    hourlyPrice: { type: Number, default: null },
    hoursNbr: { type: Number, default: null },
    diploma: { type: String, default: null },
    available: { type: String, default: '000000000000000000000000' },
    image: { type: String, default: null },
  },
  {
    timestamps: true,
  },
);

export async function hash(password: string) {
  const rounds = env === 'test' ? 1 : 10;
  return await bcrypt.hash(password, rounds);
}

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    this.password = await hash(this.password);
    next();
  } catch (e: unknown) {
    return next(e as CallbackError | undefined);
  }
});

/**
 * Methods
 */

UserSchema.methods.generateToken = function () {
  const payload = {
    sub: this._id,
  };
  const expiresIn = moment().add(expirationInterval, 'minutes');

  const token = jwt.sign(payload, accessSecret, {
    expiresIn: expiresIn.unix(),
  });
  // add lastLogin
  return { token, expiresIn: expiresIn.toISOString() };
};

UserSchema.methods.passwordMatches = function (password: string) {
  return bcrypt.compare(password, this.password);
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  folder: 'user-images',
});

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    public_id: () => `user-${Date.now()}`,
  },
});

const UserImageUploader = multer({ storage: cloudinaryStorage });
//@ts-ignore
UserSchema.methods.uploadImage = async function (file: Express.Multer.File) {
  const result = await cloudinary.uploader.upload(file.path, {
    public_id: `user-${this._id}`,
    overwrite: true,
  });
  this.image = result.public_id;
  await this.save();
};

const User = mongoose.model('User', UserSchema);

export { IBaseUser, IBaseUserData, IStudent, IProfessor, IStudentData, IProfessorData, User, UserImageUploader };
