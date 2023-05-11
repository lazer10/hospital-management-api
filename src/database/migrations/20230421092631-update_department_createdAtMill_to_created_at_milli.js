module.exports = {
  up: async (queryInterface) => {
    await queryInterface.renameColumn('Departments', 'created_at_milli', 'CreatedAtMilli');
  },

  down: async (queryInterface) => {
    await queryInterface.renameColumn('Departments', 'created_at_milli', 'CreatedAtMilli');
  }
};
