import mongoose from 'mongoose';
import { Users, Roles } from '../../../Database/mongo/models.js';

const objectId = mongoose.Types.ObjectId;

export const getAppUsersModel = async (app_id) => {
  try {
    const allData = await Roles.aggregate([
      {
        $lookup:
        {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "userInfo"
        }
      },
      {
        $match: {
          "app_id": objectId(app_id)
        }
      }
    ]);

    if (allData && allData.length) {
      const filterData = allData.map((thread) => {
        return {
          role_id: thread._id,
          role: thread.role,
          user_id: thread.user_id,
          username: (thread.userInfo && thread.userInfo.length) ? thread.userInfo[0].username : '',
          email: (thread.userInfo && thread.userInfo.length) ? thread.userInfo[0].email : '',
        }
      })
      return filterData
    } else {
      return []
    }
  } catch (e) {
    throw new Error(e)
  }
};
