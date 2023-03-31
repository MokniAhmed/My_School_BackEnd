import apiWrapper from 'crud/apiWrapper';
import create from 'crud/create';
import remove from 'crud/remove';
import update from 'crud/update';
import { GraphQLError, GraphQLFloat, GraphQLID, GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import classModel from 'models/class.model';
import courseModel from 'models/course.model';
import levelModel from 'models/level.model';
import ClassType from 'types/class.type';
import LevelType from '../types/level.type';

export default {
  createClass: apiWrapper(
    async (args, req) => {
      const { name, levelId } = args;
      const classe = new classModel({ name });
      let level = await levelModel.findByIdAndUpdate(
        { _id: levelId },
        {
          $addToSet: { classes: classe.id },
        },
      );

      if (level) {
        let listCours = level.cours;
        await Promise.all(
          listCours.map(async (name) => {
            let course = new courseModel({ name });
            course.save();
            classe.courses.push(course.id);
          }),
        );
      }

      await classe.save();

      return classe;
    },
    ClassType,
    {
      name: { type: GraphQLString, required: true },
      levelId: { type: GraphQLID, required: true },
    },

    {},
  ),

  deleteClass: apiWrapper(
    async (args, req) => {
      const { id } = args;
      let level = await levelModel.findOneAndUpdate(
        { classes: id },
        {
          $pull: { classes: id },
        },
      );

      if (level) {
        let classe = await classModel.findByIdAndDelete({ _id: id });
        if (classe) {
          let listCours = classe.courses;

          await Promise.all(
            listCours.map(async (id) => {
              await courseModel.findByIdAndDelete({ _id: id });
            }),
          );
        }
      }
      return 'deleted';
    },
    GraphQLString,
    {
      id: { type: GraphQLID, required: true },
    },

    {},
  ),

  // deleteLevelById: remove(classModel, {}),

  // modifyLevel: update(
  //   levelModel,
  //   {
  //     name: GraphQLString,
  //     cours: new GraphQLList(GraphQLString),
  //   },
  //   ClassType,
  //   {},
  // ),
  removeAll: apiWrapper(
    async (args, req) => {
      await classModel.deleteMany();
      return 'deleted';
    },
    GraphQLString,
    {},

    {},
  ),
};
