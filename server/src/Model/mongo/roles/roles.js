import { Roles, Apps } from '../../../Database/mongo/models.js';
import mongoose from 'mongoose';
const objectId = mongoose.Types.ObjectId;

export const checkRoleExists = async (app_id, user_id) => {
  try {
    let role = await Roles.findOne({ app_id: objectId(app_id), user_id: objectId(user_id) }).lean();
    return role;
  } catch (e) {
    throw new Error(e);
  }
};

export const getRoleModel = async (app_id, user_id) => {
  try {
    const allData = await Roles.aggregate([
      {
        $lookup: {
          from: 'apps',
          localField: 'app_id',
          foreignField: '_id',
          as: 'appInfo'
        }
      },
      {
        $match: {
          user_id: objectId(user_id),
          app_id: objectId(app_id)
        }
      }
    ]);

    if (allData && allData.length) {
      const filterData = allData.map((thread) => {
        return {
          app_id: thread.app_id,
          app_name: thread.appInfo && thread.appInfo.length ? thread.appInfo[0].app_name : '',
          role: thread.role,
          user_id: thread.user_id
        };
      });
      return filterData;
    } else {
      return [];
    }
  } catch (e) {
    throw new Error(e);
  }
};

export const postRoleModel = async (app_id, user_id, role) => {
  let userRole = new Roles({ app_id: objectId(app_id), user_id: objectId(user_id), role });
  await userRole.save();
  return userRole;
};

export const deleteRoleModel = async (role_id) => {
  await Roles.findByIdAndDelete({ _id: objectId(role_id) });
};
