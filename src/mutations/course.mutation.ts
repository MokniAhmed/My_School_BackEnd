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
import CourseType from 'types/course.type';
import { UserType, UserInputType } from 'types/user.type';
import LevelType from '../types/level.type';

export default {
  createCourse: apiWrapper(
    async (args, req) => {
      const { id, ...rest } = args;
      console.log(id);

      const course = new courseModel({ ...rest });
      await classModel.findByIdAndUpdate(
        { _id: id },
        {
          $addToSet: { courses: course.id },
        },
      );

      return course.save();
    },
    CourseType,
    {
      name: { type: GraphQLString, required: true },
      professeursId: { type: GraphQLID, required: true },
      color: {
        type: GraphQLString,
        required: true,
      },
      id: { type: GraphQLID, required: true },
    },

    {},
  ),

  deleteCourse: apiWrapper(
    async (args, req) => {
      const { id } = args;
      await classModel.findOneAndUpdate(
        { courses: id },
        {
          $pull: { courses: id },
        },
      );
      await courseModel.findByIdAndDelete({ _id: id });

      return 'deleted';
    },
    GraphQLString,
    {
      id: { type: GraphQLID, required: true },
    },

    {},
  ),

  modifyCourse: update(
    courseModel,
    {
      name: GraphQLString,
      color: GraphQLString,
      professeursId: GraphQLID,
    },
    CourseType,
    {},
  ),
};
