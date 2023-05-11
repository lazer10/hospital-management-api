module.exports = {
  up: async (queryInterface) => {
    await queryInterface.renameColumn('Departments', 'created_at_mill', 'created_at_milli');
  },

  down: async (queryInterface) => {
    await queryInterface.renameColumn('Departments', 'created_at_mill', 'created_at_milli');
  }
};
