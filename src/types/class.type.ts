import { GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql';
import CourseType from './course.type';
import ScheduleType from './schedule.type';
import { UserType } from './user.type';

const ClassType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Class',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    studentsIds: { type: new GraphQLList(UserType) },
    students: {
      type: new GraphQLList(UserType),
    },
    schedulesId: { type: ScheduleType },
    schedule: {
      type: ScheduleType,
    },
    courses: {
      type: new GraphQLList(CourseType),
    },
    coursesId: {
      type: new GraphQLList(GraphQLString),
    },
  }),
});

export default ClassType;
