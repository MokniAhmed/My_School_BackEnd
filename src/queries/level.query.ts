import get from 'crud/get';
import list from 'crud/list';
import levelModel from 'models/level.model';
import LevelType from 'types/level.type';

export default {
  getLevels: list(levelModel, LevelType, {}),
  getLevel: get(levelModel, LevelType, { authorizationRoles: [] }),
};
