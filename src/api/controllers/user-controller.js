import bcrypt from "bcrypt";
import {
  addUser,
  findUserById,
  listAllUsers,
  updateUser,
  removeUser,
} from "../models/user-model.js";

const getUsers = async (req, res) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Database query failed" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (user) {
      console.log(user);
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Database query failed" });
  }
};

const postUser = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);
    req.body.password = await bcrypt.hash(req.body.password, 10);
    console.log(req.body);
    const user_id = req.params.id;
    const result = await addUser(req.body);

    if (result.user_id) {
      res.status(201).json({
        message: "New user added",
        result,
      });
    } else {
      res.status(400).json({ error: "Failed to add user" });
    }
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Database insert failed" });
  }
};

const putUser = async (req, res) => {
  try {
    if (!(res.locals.user.user_id == req.params.id) && !(res.locals.user.role == "admin")) {
      res.sendStatus(403);
    }
    console.log(req.body);
    const updated = await updateUser(req.body);
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    if (updated) {
      res.json({ message: "User item updated." });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Database update failed" });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!(res.locals.user.user_id == req.params.id) && !(res.locals.user.role == "admin")) {
      res.sendStatus(403);
    }
    const delStatus = await removeUser(req.params.id);
    if (delStatus) {
      res.json({ message: "User item deleted." });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Database delete failed" });
  }
};

export { getUsers, getUserById, postUser, putUser, deleteUser };
