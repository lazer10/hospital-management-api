module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.changeColumn('Departments', 'CreatedAtMilli', {
    type: Sequelize.BIGINT,
    allowNull: false,
  }),
  down: async (queryInterface) => queryInterface.changeColumn('Departments', 'CreatedAtMilli'),
};
