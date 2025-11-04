const userItems = [
  {
    user_id: 1,
    name: "John Doe",
    username: "johndoe",
    email: "john@metropolia.fi",
    role: "user",
    password: "password",
  },
    {
    user_id: 2,
    name: "Jane Doe",
    username: "janedoe",
    email: "jane@metropolia.fi",
    role: "admin",
    password: "admin",
  },
];

const listAllUsers = () => {
  return userItems;
};

const findUserById = (id) => {
  return userItems.find((item) => item.user_id == Number(id));
};

const addUser = (user) => {
  const { name, username, email, role, password } = user;
  const newId = userItems[userItems.length - 1].user_id + 1;
  userItems.push({ user_id: newId, name, username, email, role, password });
  return { user_id: newId };
};

const removeUser = (id) => {
  try {
    userItems.splice(userItems.findIndex((item) => item.user_id == Number(id)));
    return { success: true, id: id };
  } catch {
    return { success: false };
  }
};

const updateUser = (userData) => {
  console.log(userData);
  const user = userItems.find((item) => item.user_id === Number(userData.user_id));

  if (!user) {
    return { error: "User not found" };
  } else if (user.user_id === undefined) {
    return { error: "user_idrequired" };
  }

  if (userData.name !== undefined) user.name = userData.name;
  if (userData.username !== undefined) user.username = userData.username;
  if (userData.email !== undefined) user.email = userData.email;
  if (userData.role !== undefined) user.role = userData.role;
  if (userData.password !== undefined) user.password = userData.password;

  return { user };
};

export { listAllUsers, findUserById, addUser, removeUser, updateUser };
