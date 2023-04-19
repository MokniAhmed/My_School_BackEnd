import get from 'crud/get';
import list from 'crud/list';
import { GraphQLID, GraphQLString } from 'graphql';
import { User } from 'models/user.model';
import { UserType } from 'types/user.type';
import notesModel from 'models/notes.model';
import NoteType from 'types/notes.type';

export default {
  getNotesByCours: list(notesModel, NoteType, {
    args: {
      course: { type: GraphQLID },
    },
  }),
  // getUser: get(User, UserType, { authorizationRoles: [] }),
};
