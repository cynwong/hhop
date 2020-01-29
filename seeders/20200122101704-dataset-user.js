
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert("users", [
    {
      id: 1,
      email: "testuser@gmail.com",
      password: "testuser",
      name: "Test User",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete("users", null, {}),
};
