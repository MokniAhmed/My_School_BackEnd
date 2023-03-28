import { GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql';
import ClassType from './class.type';

const LevelType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Level',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    cours: { type: new GraphQLList(GraphQLString) },
    classes: {
      type: new GraphQLList(ClassType),
    }
  })
});

export default LevelType