import { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLFloat } from 'graphql';
import CourseType from './course.type';
import ScheduleType from './schedule.type';
import { UserType } from './user.type';
import ClassType from './class.type';

const NoteType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Note',
  fields: () => ({
    id: { type: GraphQLString },
    note1: { type: GraphQLFloat },
    note2: { type: GraphQLFloat },
    student: { type: UserType },
    professeur: { type: UserType },
    classe: { type: ClassType },
    course: {
      type: CourseType,
    },
  }),
});

export default NoteType;
