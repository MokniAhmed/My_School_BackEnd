import get from "crud/get";
import list from "crud/list";
import { GraphQLString } from "graphql";
import { User } from "models/user.model";
import { UserType } from "types/user.type";

export default {
  getUsers: list(User, UserType, {
    args: {
      role: { type: GraphQLString },
    },
  }),
  getUser: get(User, UserType, { authorizationRoles: [] }),
};
