import get from 'crud/get';
import list from 'crud/list';
import { GraphQLID } from 'graphql';
import classModel from 'models/class.model';
import courseModel from 'models/course.model';
import levelModel from 'models/level.model';
import ClassType from 'types/class.type';
import CourseType from 'types/course.type';
import LevelType from 'types/level.type';

export default {
  getCourses: list(courseModel, CourseType, {}),
  getCoursesByProf: list(courseModel, CourseType, {
    args: {
      professeursId: { type: GraphQLID },
    },
  }),
  getCourse: get(courseModel, CourseType, { authorizationRoles: [] }),
};
