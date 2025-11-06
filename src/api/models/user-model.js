import promisePool from "../../utils/database.js";

const listAllUsers = async () => {
  const [rows] = await promisePool.query("SELECT * FROM wsk_users");
  console.log("rows", rows);
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    "SELECT * FROM wsk_users WHERE user_id = ?",[id]
  );
  console.log('rows', rows);
  return rows[0];
};

const addUser = async (user) => {
  const { name, username, email, role, password } = user;
  const sql = `INSERT INTO wsk_users (name, username, email, role, password) VALUES (?,?,?,?,?)`;
  const params = [name, username, email, role, password];
  const rows = await promisePool.execute(sql, params);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return { user_id: rows[0].insertId };
};

const removeUser = async (id) => {
  const [rows] = await promisePool.execute(
    "DELETE FROM wsk_users WHERE user_id = ?",
    [id]
  );
  console.log("rows", rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return { message: "succe" };
};

const updateUser =  async (userData) => {
  console.log(userData);
  const fields = [];
  const values = [];

  if (userData.name !== undefined) {
    fields.push("name = ?");
    values.push(userData.name);
  }
  if (userData.username !== undefined) {
    fields.push("username = ?");
    values.push(userData.username);
  }
  if (userData.email !== undefined) {
    fields.push("email = ?");
    values.push(userData.email);
  }
  if (userData.role !== undefined) {
    fields.push("role = ?");
    values.push(userData.role);
  }
  if (userData.password !== undefined) {
    fields.push("password = ?");
    values.push(userData.password);
  }
  if (fields.length === 0) return {status: 400,message: "No fields to update"};
  if (!userData.user_id) return {status: 400,message: "user_id required"};

  const sql = `UPDATE wsk_users SET ${fields.join(", ")} WHERE user_id = ?`;
  values.push(userData.user_id);

  const [rows] = await promisePool.execute(sql, values);

  return values;
};

export { listAllUsers, findUserById, addUser, removeUser, updateUser };
