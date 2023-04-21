module.exports = {
  up: async (queryInterface) => {
    await queryInterface.renameColumn('departments', 'createdAtMill', 'created_at_milli');
  },

  down: async (queryInterface) => {
    await queryInterface.renameColumn('departments', 'created_at_milli', 'createdAtMill');
  }
};
