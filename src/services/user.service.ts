import {
  IBaseUserData,
  IProfessorData,
  IStudentData,
  Role,
  User,
  UserDocument,
} from "models/user.model";

const emailGenerator = async (
  firstName: string,
  lastName: string,
  role: Role
) => {
  const emailBase = `@myschool-${role}.tn`;
  let fullName = `${firstName}${lastName}`;
  let email = `${fullName}${emailBase}`;
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    fullName = fullName + Math.floor(Math.random() * 10) + 1;
    email = `${fullName}${emailBase}`;
  }

  return email;
};

export const createBaseUser = (baseUser: Omit<IBaseUserData, "email">) => {
  const { firstName, lastName, role } = baseUser;
  const email = emailGenerator(firstName, lastName, role);
  //@ts-ignore
  const user = new User({ ...baseUser }, email);
  return user;
};

export const createStudent = async (
  baseUserModel: UserDocument,
  studentData: IStudentData
) => {
  const { fatherFullName, motherFullName, motherJob, fatherJob } = studentData;

  baseUserModel.fatherFullName = fatherFullName;
  baseUserModel.motherFullName = motherFullName;
  baseUserModel.motherJob = motherJob;
  baseUserModel.fatherJob = fatherJob;

  return await baseUserModel.save();
};

export const createProfessor = async (
  baseUserModel: UserDocument,
  professorData: IProfessorData
) => {
  const { hourlyPrice, hoursNbr, diploma } = professorData;

  baseUserModel.hourlyPrice = hourlyPrice;
  baseUserModel.hoursNbr = hoursNbr;
  baseUserModel.diploma = diploma;

  return await baseUserModel.save();
};
