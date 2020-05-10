const users = [];

const addUser = ({ id, name, room }) => {
  // Sanitize username and room name
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Check if user already exists
  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (existingUser) {
    return { error: "Username is taken" };
  }

  // Push user into array if they don't exist
  const user = { id, name, room };
  users.push(user);

  return { user };
};

const removeUser = (id) => {
  // Find user by id
  const index = users.findIndex((user) => user.id === id);

  // Splice out user
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
