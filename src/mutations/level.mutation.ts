import apiWrapper from 'crud/apiWrapper';
import create from 'crud/create';
import remove from 'crud/remove';
import update from 'crud/update';
import { GraphQLError, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import { GraphQLDate } from 'graphql-scalars';
import levelModel from 'models/level.model';
import { User } from 'models/user.model';
import { UserType, UserInputType } from 'types/user.type';
import LevelType from './../types/level.type';

export default {
  createLevel: create(
    levelModel,
    {
      name: { type: GraphQLString, required: true },
      cours: {
        type: new GraphQLList(GraphQLString),
        required: false,
      },
    },

    LevelType,
    {},
  ),

  deleteLevelById: remove(levelModel, {}),

  modifyLevel: update(
    levelModel,
    {
      name: GraphQLString,
      cours: new GraphQLList(GraphQLString),
    },
    LevelType,
    {},
  ),
};
