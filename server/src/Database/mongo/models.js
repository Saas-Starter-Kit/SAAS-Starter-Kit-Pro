import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  username: String,
  email: String,
  firebase_user_id: String,
  verify_key: String,
  is_email_verified: { type: Boolean, default: false }
});

const orgSchema = new Schema({
  org_name: String,
  primary_email: String,
  stripe_customer_id: String,
  subscription_id: String,
  plan_type: String
});

const rolesSchema = new Schema({
  role: String,
  org_id: { type: Schema.Types.ObjectId, ref: 'Organizations' },
  user_id: { type: Schema.Types.ObjectId, ref: 'Users' }
});

const todosSchema = new Schema({
  title: String,
  description: String,
  author: String,
  org_id: { type: Schema.Types.ObjectId, ref: 'Organizations' }
});

const invitesSchema = new Schema({
  org_id: { type: Schema.Types.ObjectId, ref: 'Organizations' },
  verify_key: String,
  recipient_email: String,
  sender_email: String
});

export const Roles = mongoose.model('Roles', rolesSchema);
export const Users = mongoose.model('Users', usersSchema);
export const Todos = mongoose.model('Todos', todosSchema);
export const Invites = mongoose.model('Invites', invitesSchema);
export const Organizations = mongoose.model('Organizations', orgSchema);
