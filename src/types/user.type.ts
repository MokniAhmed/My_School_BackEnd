import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLInputObjectType,
} from 'graphql';
import { GraphQLDate } from 'graphql-scalars';
import { Role } from 'models/user.model';

export const UserRole = new GraphQLEnumType({
  name: 'Role',
  values: {
    [Role.ADMIN]: { value: Role.ADMIN },
    [Role.PROF]: { value: Role.PROF },
    [Role.STUDENT]: { value: Role.STUDENT },

  },
});

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    emailPer: { type: GraphQLString },
    telephone: { type: GraphQLString },
    birthday: { type: GraphQLDate },
    gender: { type: GraphQLString },
    address: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: UserRole },
    image: { type: GraphQLString },

    fatherFullName: { type: GraphQLString },
    motherFullName: { type: GraphQLString },
    fatherJob: { type: GraphQLString },
    motherJob: { type: GraphQLString },
    hourlyPrice: { type: GraphQLFloat },
    hoursNbr: { type: GraphQLInt },
    diploma: { type: GraphQLString },
  },
});

export const UserInputType: GraphQLInputObjectType = new GraphQLInputObjectType(
  {
    name: "UserInput",
    fields: {
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      telephone: { type: GraphQLString },
      birthday: { type: GraphQLDate },
      gender: { type: GraphQLString },
      address: { type: GraphQLString },
      role: { type: UserRole },
      image: { type: GraphQLString },
      emailPer: { type: GraphQLString },

      fatherFullName: { type: GraphQLString },
      motherFullName: { type: GraphQLString },
      fatherJob: { type: GraphQLString },
      motherJob: { type: GraphQLString },
      hourlyPrice: { type: GraphQLFloat },
      hoursNbr: { type: GraphQLInt },
      diploma: { type: GraphQLString },
    },
  }
);


