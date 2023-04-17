import apiWrapper from 'crud/apiWrapper';
import create from 'crud/create';
import remove from 'crud/remove';
import update from 'crud/update';
import { GraphQLError, GraphQLFloat, GraphQLID, GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import classModel from 'models/class.model';
import courseModel from 'models/course.model';
import levelModel from 'models/level.model';
import ClassType from 'types/class.type';
import LevelType from '../types/level.type';
import scheduleModel from 'models/schedule.model';
import { number } from 'joi';
import { User } from 'models/user.model';
import ScheduleType from 'types/schedule.type';

export default {
  createSchedule: apiWrapper(
    async (args, req) => {
      const { coursesIds, classId } = args;

      var schedule = new scheduleModel({ coursesIds });

      await Promise.all(
        coursesIds.map(async (courseId: string) => {
          let course = await courseModel.findById({ _id: courseId });

          if (course) {
            if (course?.name != 'vide') {
              let prof = await User.findById({ _id: course?.professeursId });
              let avaible = prof?.available;
              console.log(avaible);
              console.log(coursesIds.indexOf(courseId));
              let newx = '';
              for (let index = 0; index < coursesIds!.length; index++) {
                if (coursesIds![index] == courseId) newx = newx + '1';
                else newx = newx + avaible![index];
              }

              prof!.available = newx;

              await prof?.save();
            }
          }
        }),
      );

      await classModel.findByIdAndUpdate(
        { _id: classId },
        {
          schedulesId: schedule._id,
        },
      );
      await schedule.save();
    },
    ScheduleType,
    {
      coursesIds: {
        type: new GraphQLList(GraphQLID),
        required: true,
      },
      classId: { type: GraphQLID, required: true },
    },

    {},
  ),

 
};
