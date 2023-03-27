import { GraphQLObjectType, GraphQLString } from 'graphql';
import { UserType } from './user.type';

const CourseType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Course',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    professeursId: { type: UserType }
  })
});

export default CourseType;