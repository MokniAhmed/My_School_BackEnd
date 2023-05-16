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
import { UserRole } from './user.type';

export const PreleveType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Preleve',
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    emailPer: { type: GraphQLString },
    telephone: { type: GraphQLString },
    birthday: { type: GraphQLDate },
    gender: { type: GraphQLString },
    address: { type: GraphQLString },
    role: { type: UserRole },

    fatherFullName: { type: GraphQLString },
    motherFullName: { type: GraphQLString },
    fatherJob: { type: GraphQLString },
    motherJob: { type: GraphQLString },
  },
});
