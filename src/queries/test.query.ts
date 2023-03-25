import get from "crud/get";
import list from "crud/list";
import Test from "models/test.model";
import { Role } from "models/user.model";
import { TestType } from "types/test.type";

export default {
  tests: list(Test, TestType, { authorizationRoles: [Role.ADMIN] }),
  test: get(Test, TestType, { authorizationRoles: [Role.ADMIN] }),
};
