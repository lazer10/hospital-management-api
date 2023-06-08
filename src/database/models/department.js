const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    static associate(models) {
      Department.hasMany(models.Doctor, { foreignKey: 'departments' });
    }
  }
  Department.init({
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.literal('gen_random_uuid()')
    },
    name: DataTypes.STRING,
    created_at_milli: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Department',
  });
  return Department;
};
