
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert("users", [
    {
      id: 1,
      email: "testuser@gmail.com",
      password: "$2b$10$DLFqdSVcQ7QWLpmI327mbe40ohL2uE2LUP02mk/nWFFSzKZTVGQ4W",
      name: "Test User",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete("users", null, {}),
};
