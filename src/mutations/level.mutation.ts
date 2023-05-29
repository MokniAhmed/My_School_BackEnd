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

  deleteLevel: apiWrapper(
    async (args, req) => {
      const { id } = args;
      let level = await levelModel.findByIdAndDelete({ _id: id });

      if (level) {
        let classes = level.classes;
        await Promise.all(
          classes.map(async (idclass) => {
            let classe = await classModel.findByIdAndDelete({ _id: idclass });
            if (classe) {
              let listCours = classe.courses;
              await Promise.all(
                listCours.map(async (id) => {
                  await courseModel.findByIdAndDelete({ _id: id });
                }),
              );
            }
          }),
        );
      }
      return 'deleted';
    },
    GraphQLString,
    {
      id: { type: GraphQLID, required: true },
    },

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
