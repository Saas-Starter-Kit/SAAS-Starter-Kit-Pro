import mongoose from 'mongoose';
const objectId = mongoose.Types.ObjectId;
import { Apps, Roles, Todos } from '../../../Database/mongo/models.js';

export const getAppModel = async (user_id) => {
  try {
    const allData = await Roles.aggregate([
      {
        $lookup:
        {
          from: "apps",
          localField: "app_id",
          foreignField: "_id",
          as: "appInfo"
        }
      },
      {
        $match: {
          "user_id": objectId(user_id)
        }
      }
    ]);

    if (allData && allData.length) {
      const filterData = allData.map((thread) => {
        return {
          app_id: thread.app_id,
          app_name: (thread.appInfo && thread.appInfo.length) ? thread.appInfo[0].app_name : '',
          role: thread.role,
          user_id: thread.user_id,
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

export const postAppModel = async (name) => {
  if (name) {
    let app = new Apps({ app_name: name });
    await app.save();
    return app._id;
  } else {
    return ''
  }
};

export const deleteAppModel = async (app_id) => {
  await Roles.findOneAndDelete({ app_id: objectId(app_id) });
  await Todos.findOneAndDelete({ app_id: objectId(app_id) });
  await Apps.findOneAndDelete({ _id: objectId(app_id) });
};
