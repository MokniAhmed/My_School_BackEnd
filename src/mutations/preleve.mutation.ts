import apiWrapper from 'crud/apiWrapper';
import create from 'crud/create';
import remove from 'crud/remove';
import update from 'crud/update';
import { GraphQLError, GraphQLFloat, GraphQLID, GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import { GraphQLDate } from 'graphql-scalars';
import classModel from 'models/class.model';
import courseModel from 'models/course.model';
import levelModel from 'models/level.model';
import { User } from 'models/user.model';
import { UserType, UserInputType } from 'types/user.type';
import LevelType from './../types/level.type';
import preleveModel from 'models/preleve.model';
import { PreleveType } from 'types/preleve.type';
export default {
  createPreEleve: create(
    preleveModel,
    {
      emailPer: { type: GraphQLString, required: true },
      firstName: { type: GraphQLString, required: true },
      lastName: { type: GraphQLString, required: true },
      images: { type: GraphQLString, required: false },
      telephone: { type: GraphQLString, required: true },
      birthday: { type: GraphQLDate, required: true },
      gender: { type: GraphQLString, required: true },
      address: { type: GraphQLString, required: true },
      fatherFullName: { type: GraphQLString, required: false },
      motherFullName: { type: GraphQLString, required: false },
      fatherJob: { type: GraphQLString, required: false },
      motherJob: { type: GraphQLString, required: false },
    },
    PreleveType,
    {},
  ),

  deleteElevePreById: remove(preleveModel, {}),
};
