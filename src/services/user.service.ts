import { IBaseUserData, IProfessorData, IStudentData, Role, User, UserDocument } from 'models/user.model';

export const emailGenerator = (
  firstName: string,
  lastName: string,
  role: Role,
  telephone: string,
  password: string,
) => {
  const emailBase = `@myschool-${role}.tn`;
  let fullName = `${firstName}${lastName}`;
  let phone = `${telephone.slice(6)}`;
  let email = `${fullName}${phone}${emailBase}`;
  password = `${fullName}${phone}`;

  // const emailExists = await User.findOne({ email });
  // if (emailExists) {
  //   fullName = fullName + Math.floor(Math.random() * 10) + 1;
  //   email = `${fullName}${emailBase}`;
  // }

  return { email, password };
};

export const createBaseUser = (baseUser: Omit<IBaseUserData, 'email'>) => {
  const { firstName, lastName, telephone, role } = baseUser;
  const { password, ...rest } = baseUser;
  const login = emailGenerator(firstName, lastName, role, telephone, password);
  const user = new User({ ...rest, ...login });
  return user;
};

export const createStudent = async (baseUserModel: UserDocument, studentData: IStudentData) => {
  const { fatherFullName, motherFullName, motherJob, fatherJob } = studentData;

  baseUserModel.fatherFullName = fatherFullName;
  baseUserModel.motherFullName = motherFullName;
  baseUserModel.motherJob = motherJob;
  baseUserModel.fatherJob = fatherJob;

  return await baseUserModel.save();
};

export const createProfessor = async (baseUserModel: UserDocument, professorData: IProfessorData) => {
  const { hourlyPrice, hoursNbr, diploma } = professorData;

  baseUserModel.hourlyPrice = hourlyPrice;
  baseUserModel.hoursNbr = hoursNbr;
  baseUserModel.diploma = diploma;

  return await baseUserModel.save();
};
