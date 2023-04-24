module.exports = {
  up: async (queryInterface) => {
    await queryInterface.renameColumn('Departments', 'CreatedAtMilli', 'created_at_milli');
  },

  down: async (queryInterface) => {
    await queryInterface.renameColumn('Departments', 'created_at_milli', 'CreatedAtMilli');
  }
};
