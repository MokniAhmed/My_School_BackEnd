import { GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql';
import CourseType from './course.type';

const ScheduleType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Schedule',
  fields: () => ({
    id: { type: GraphQLString },
    coursesIds: { type: new GraphQLList(GraphQLString) },
    courses: {
      type: new GraphQLList(CourseType)
    }
  })
});

export default ScheduleType;