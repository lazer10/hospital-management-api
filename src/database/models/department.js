const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Department.init({
    name: DataTypes.STRING,
    created_at_milli: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Department',
  });
  return Department;
};
