import { GraphQLError, GraphQLFloat, GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql';

import apiWrapper from 'crud/apiWrapper';
import { User, roles, Role, UserDocument } from 'models/user.model';
import { RefreshToken } from 'models/refreshToken.model';
import { AuthType } from 'types/auth.type';
import { generateTokenResponse, getAgent } from 'utils/authHelpers';
import { GraphQLDate } from 'graphql-scalars';
import { createBaseUser, createProfessor, createStudent } from 'services/user.service';
import { UserType } from 'types/user.type';
import classModel from 'models/class.model';

export default {
  login: apiWrapper(
    async (args, req) => {
      const user = await User.findOne({ email: args.email });
      if (!user || !(await user.passwordMatches(args.password))) throw new GraphQLError('Invalid credentials');

      const token = await generateTokenResponse(user, req);

      return { token, user };
    },
    AuthType,
    {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    {},
  ),
  register: apiWrapper(
    async (args, req) => {
      const {
        role,
        firstName,
        lastName,
        telephone,
        birthday,
        address,
        gender,
        image,
        motherFullName,
        fatherFullName,
        fatherJob,
        motherJob,
        diploma,
        hourlyPrice,
        hoursNbr,
        emailPer,
        classId,
      } = args;
      let user: UserDocument = new User();

      if (!roles.includes(role)) {
        throw new GraphQLError('This role is invalid');
      }

      const baseUser = createBaseUser({
        role,
        firstName,
        lastName,
        password: '',
        telephone,
        birthday,
        address,
        gender,
        image,
        emailPer,
      });

      if (role === Role.STUDENT) {
        user = await createStudent(baseUser, {
          motherFullName,
          fatherFullName,
          fatherJob,
          motherJob,
        });
        if (classId) {
          await classModel.findByIdAndUpdate(
            { _id: classId },
            {
              $addToSet: { studentsIds: user.id },
            },
          );
        }
      }
      if (role === Role.PROF) {
        user = await createProfessor(baseUser, {
          diploma,
          hourlyPrice,
          hoursNbr,
          available: '000000000000000000000000',
        });
      }

      return user;
    },
    UserType,
    {
      emailPer: { type: GraphQLString, required: true },
      firstName: { type: GraphQLString, required: true },
      lastName: { type: GraphQLString, required: true },
      role: { type: GraphQLString, required: true },
      telephone: { type: GraphQLString, required: true },
      birthday: { type: GraphQLDate, required: true },
      gender: { type: GraphQLString, required: true },
      address: { type: GraphQLString, required: true },
      image: { type: GraphQLString, required: true },

      fatherFullName: { type: GraphQLString, required: false },
      motherFullName: { type: GraphQLString, required: false },
      fatherJob: { type: GraphQLString, required: false },
      motherJob: { type: GraphQLString, required: false },
      hourlyPrice: { type: GraphQLFloat, required: false },
      hoursNbr: { type: GraphQLInt, required: false },
      diploma: { type: GraphQLString, required: false },
      classId: { type: GraphQLID, required: false },
    },
  ),
  refresh: apiWrapper(
    async (args, req) => {
      const refreshToken = await RefreshToken.findOne({
        token: args.refreshToken,
      });

      if (!refreshToken) throw new GraphQLError('Invalid token');
      const user = await User.findOne({ _id: refreshToken.user });
      if (!user) throw new GraphQLError('Invalid token');
      const token = await generateTokenResponse(user, req);
      return { user, token };
    },
    AuthType,
    {
      refreshToken: { type: new GraphQLNonNull(GraphQLString) },
    },
    {},
  ),
  logout: apiWrapper(
    async (args, req) => {
      const { user } = req;
      const agent = getAgent(req);
      if (user) {
        await RefreshToken.deleteOne({ userId: user.id, agent });
      }
      return 'done';
    },
    GraphQLString,
    {},
  ),
};
