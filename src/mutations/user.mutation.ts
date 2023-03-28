import apiWrapper from 'crud/apiWrapper';
import remove from 'crud/remove';
import update from 'crud/update';
import { GraphQLError, GraphQLFloat, GraphQLInt, GraphQLString } from 'graphql';
import { GraphQLDate } from 'graphql-scalars';
import { User } from 'models/user.model';
import { UserType, UserInputType } from 'types/user.type';

export default {
  deleteUser: apiWrapper(
    async (args) => {
      const { email } = args;

      const user = await User.deleteOne({ email });
      if (!user) {
        return new GraphQLError("User does't exist");
      }

      return 'User has been deleted successfuly';
    },
    GraphQLString,
    {
      email: { type: GraphQLString, require: true },
    },
  ),
  deleteUserById: remove(User, {}),

  modifyUser: update(
    User,
    {
      firstName: GraphQLString,
      lastName: GraphQLString,
      telephone: GraphQLString,
      birthday: GraphQLDate,
      gender: GraphQLString,
      address: GraphQLString,
      image: GraphQLString,
      emailPer: GraphQLString,

      fatherFullName: GraphQLString,
      motherFullName: GraphQLString,
      fatherJob: GraphQLString,
      motherJob: GraphQLString,
      hourlyPrice: GraphQLFloat,
      hoursNbr: GraphQLInt,
      diploma: GraphQLString,
    },
    UserType,
    {},
  ),
};
