import db from '../../Database/sql/db.js';

const clearDb = async () => {
  let text = `DELETE FROM apps`;
  let text2 = `DELETE FROM users`;
  let text3 = `DELETE FROM roles`;
  let text4 = `DELETE FROM todos`;

  await db.query(text);
  await db.query(text2);
  await db.query(text3);
  await db.query(text4);
};
