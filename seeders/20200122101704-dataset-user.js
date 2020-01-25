
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert("users", [
    {
      id: 1,
      username: "testuser",
      password: "testuser",
      first_name: "Test",
      last_name: "User",
      email: "testuser@gmail.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete("users", null, {}),
};
