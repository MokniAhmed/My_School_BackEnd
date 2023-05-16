import get from 'crud/get';
import list from 'crud/list';
import levelModel from 'models/level.model';
import preleveModel from 'models/preleve.model';
import LevelType from 'types/level.type';
import { PreleveType } from 'types/preleve.type';

export default {
  getPreleves: list(preleveModel, PreleveType, {}),
  // getLevel: get(levelModel, LevelType, { authorizationRoles: [] }),
};
