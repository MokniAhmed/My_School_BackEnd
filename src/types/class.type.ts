import { GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql';
import ScheduleType from './schedule.type';
import { UserType } from './user.type';

const ClassType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Class',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    studentsIds: { type: new GraphQLList(GraphQLString) },
    students: {
      type: new GraphQLList(UserType),
    },
    schedulesId: { type: GraphQLString },
    schedule: {
      type: ScheduleType,
    }
  })
});

export default ClassType;