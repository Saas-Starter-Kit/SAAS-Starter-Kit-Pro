import { Schema, model } from 'mongoose';

const appsSchema = new Schema({
  app_name: String
});

const rolesSchema = new Schema({
  role: String,
  app_id: { type: Schema.Types.ObjectId, ref: 'Apps' },
  user_id: { type: Schema.Types.ObjectId, ref: 'Users' }
});

const usersSchema = new Schema({
  username: String,
  email: String,
  stripe_customer_id: String,
  firebase_user_id: String,
  is_paid_member: Boolean,
  subscription_id: String
});

const todosSchema = new Schema({
  title: String,
  description: String,
  author: String,
  app_id: { type: Schema.Types.ObjectId, ref: 'Apps' }
});

export const Apps = model('Apps', appsSchema);
export const Roles = model('Roles', rolesSchema);
export const Users = model('Users', usersSchema);
export const Todos = model('Todos', todosSchema);
