import get from 'crud/get';
import list from 'crud/list';
import classModel from 'models/class.model';
import levelModel from 'models/level.model';
import ClassType from 'types/class.type';
import LevelType from 'types/level.type';

export default {
  getClasses: list(classModel, ClassType, {}),
  getClass: get(classModel, ClassType, { authorizationRoles: [] }),
};
