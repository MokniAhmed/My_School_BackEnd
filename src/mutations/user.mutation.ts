import apiWrapper from "crud/apiWrapper";
import update from "crud/update";
import { GraphQLError, GraphQLString } from "graphql";
import { User } from "models/user.model";
import { UserType, UserInputType } from "types/user.type";


export default {
    deleteUser: apiWrapper(
        async (args) => {
            const { email } = args;

            const user = await User.deleteOne({ email });
            if (!user) {
                return new GraphQLError("User does't exist");
            }

            return "User has been deleted successfuly";
        },
        GraphQLString,
        {
            email: { type: GraphQLString, require: true }
        }
    ),

    modifyUser: update(
        User,
        { user: UserInputType },
        UserType,
        {}
    )
};