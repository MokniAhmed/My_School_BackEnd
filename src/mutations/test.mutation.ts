import joi from 'joi';
import { GraphQLString } from 'graphql';

import create from 'crud/create';
import update from 'crud/update';
import remove from 'crud/remove';

import { Role } from 'models/user.model';
import Test from 'models/test.model';

import { TestType } from 'types/test.type';

const createTestValidation = {
  title: joi.string().required(),
};

const updateTestValidation = {
  title: joi.string(),
};

export default {
  createTest: create(Test, { title: { type: GraphQLString, required: true } }, TestType, {
    validateSchema: createTestValidation,
    authorizationRoles: [Role.ADMIN],
  }),
  updateTest: update(Test, { title: GraphQLString }, TestType, {
    validateSchema: updateTestValidation,
    authorizationRoles: [Role.ADMIN],
  }),
  removeTest: remove(Test, { authorizationRoles: [Role.ADMIN] }),
};
