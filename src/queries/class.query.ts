import apiWrapper from 'crud/apiWrapper';
import get from 'crud/get';
import list from 'crud/list';
import { GraphQLID, GraphQLList } from 'graphql';
import classModel from 'models/class.model';
import courseModel from 'models/course.model';
import levelModel from 'models/level.model';
import ClassType from 'types/class.type';
import LevelType from 'types/level.type';
import { IClass } from './../models/class.model';
import { ICourse } from './../models/course.model';
import { IStudent } from 'models/user.model';
import { UserType } from 'types/user.type';

export default {
  getClasses: list(classModel, ClassType, {}),
  getClass: get(classModel, ClassType, { authorizationRoles: [] }),
  getClassByProf: apiWrapper(
    async (args) => {
      const { id } = args;
      var classess: IClass[] = [];
      const matiers = await courseModel.find({ professeursId: id }).select('_id');
      if (matiers) {
        await Promise.all(
          matiers.map(async (c: ICourse) => {
            const classe = await classModel.findOne({ courses: c._id }).populate('courses');
            if (classe) {
              const x = classess;
              var fli = x.filter((cs: IClass, k) => cs._id.toString() == classe?._id.toString());
              if (fli.length == 0) {
                classess.push(classe);
              }
            }
          }),
        );
      }
      return classess;
    },
    GraphQLList(ClassType),
    {
      id: { type: GraphQLID, required: false },
    },
    {},
  ),
  getEleveByProf: apiWrapper(
    async (args) => {
      const { id } = args;
      var students: any[] = [];
      var classess: IClass[] = [];
      const matiers = await courseModel.find({ professeursId: id }).select('_id');
      if (matiers) {
        await Promise.all(
          matiers.map(async (c: ICourse) => {
            const classe = await classModel.findOne({ courses: c._id }).populate('studentsIds');
            if (classe) {
              const x = classess;
              var fli = x.filter((cs: IClass, k) => cs._id.toString() == classe?._id.toString());
              if (fli.length == 0) {
                classess.push(classe);
                students = students.concat(classe?.studentsIds);
              }
            }
          }),
        );
      }
      console.log(students);

      return students;
    },
    GraphQLList(UserType),
    {
      id: { type: GraphQLID, required: false },
    },
    {},
  ),
};
