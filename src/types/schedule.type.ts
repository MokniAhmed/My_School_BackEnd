import { GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql';
import CourseType from './course.type';

const ScheduleType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Schedule',
  fields: () => ({
    id: { type: GraphQLString },
    coursesIds: { type: new GraphQLList(CourseType) },
    courses: {
      type: new GraphQLList(GraphQLString),
    },
  }),
});

export default ScheduleType;
