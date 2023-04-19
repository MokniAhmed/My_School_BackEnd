import apiWrapper from 'crud/apiWrapper';
import create from 'crud/create';
import remove from 'crud/remove';
import update from 'crud/update';
import { GraphQLError, GraphQLFloat, GraphQLID, GraphQLInt, GraphQLList, GraphQLString, graphql } from 'graphql';
import classModel from 'models/class.model';
import courseModel from 'models/course.model';
import levelModel from 'models/level.model';
import ClassType from 'types/class.type';
import LevelType from '../types/level.type';
import notesModel from 'models/notes.model';
import NoteType from 'types/notes.type';

export default {
  createNotes: apiWrapper(
    async (args, req) => {
      const { course, professeur } = args;
      let classe = await classModel.findOne({ courses: course });
      if (classe) {
        let liststudent = classe.studentsIds;
        console.log(liststudent);

        await Promise.all(
          liststudent.map(async (id) => {
            let note = new notesModel({ classe, professeur, course, student: id });
            await note.save();
          }),
        );
      }
      return 'add';
    },
    GraphQLString,
    {
      course: { type: GraphQLID, required: true },
      professeur: { type: GraphQLID, required: true },
    },

    {},
  ),

  modifyNote: update(
    notesModel,
    {
      note1: GraphQLFloat,
      note2: GraphQLFloat,
    },
    NoteType,
    {},
  ),
  removeAllNote: apiWrapper(
    async (args, req) => {
      await notesModel.deleteMany();
      return 'deleted';
    },
    GraphQLString,
    {},

    {},
  ),
};
