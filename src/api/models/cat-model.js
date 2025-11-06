import promisePool from "../../utils/database.js";

const listAllCats = async () => {
  const [rows] = await promisePool.query(
    "SELECT c.* , o.name AS owner FROM wsk_cats AS c JOIN wsk_users AS o ON c.owner = o.user_id"
  );
  console.log("rows", rows);
  return rows;
};

const findCatsByOwner = async (id) => {
  const [rows] = await promisePool.execute(
    "SELECT * FROM wsk_cats WHERE owner = ?",
    [id]
  );
  console.log("rows", rows);
  if (rows.length === 0) {
    return false;
  }
  return rows;
};

const findCatById = async (id) => {
  const [rows] = await promisePool.execute(
    "SELECT c.* , o.name AS owner FROM wsk_cats AS c JOIN wsk_users AS o ON c.owner = o.user_id WHERE cat_id = ?",
    [id]
  );
  console.log("rows", rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addCat = async (cat) => {
  let { cat_name, weight, owner, filename, birthdate } = cat;
  filename = `uploads/${cat.image}`;
  console.log(cat);
  const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [cat_name, weight, owner, filename, birthdate];
  console.log(params);
  const rows = await promisePool.execute(sql, params);
  console.log("rows", rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return { cat_id: rows[0].insertId };
};
const modifyCat = async (data) => {
  const fields = [];
  const values = [];

  if (data.cat_name) {
    fields.push("cat_name = ?");
    values.push(data.cat_name);
  }
  if (data.birthdate) {
    fields.push("birthdate = ?");
    values.push(data.birthdate);
  }
  if (data.weight) {
    fields.push("weight = ?");
    values.push(data.weight);
  }
  if (data.owner) {
    fields.push("owner = ?");
    values.push(data.owner);
  }
  if (data.image) {
    fields.push("image = ?");
    values.push(data.image);
  }

  if (fields.length === 0) return {status: 400,message: "No fields to update"};
  if (!userData.cat_id) return {status: 400,message: "cat_id required"};

  const sql = `UPDATE wsk_cats SET ${fields.join(", ")} WHERE cat_id = ?`;
  values.push(data.cat_id);

  const [rows] = await promisePool.execute(sql, values);
  return rows;
};

const removeCat = async (id) => {
  const [rows] = await promisePool.execute(
    "DELETE FROM wsk_cats WHERE cat_id = ?",
    [id]
  );
  console.log("rows", rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return { message: "success" };
};
export {
  listAllCats,
  findCatById,
  addCat,
  modifyCat,
  removeCat,
  findCatsByOwner,
};
