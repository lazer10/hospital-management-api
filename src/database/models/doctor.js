const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    static associate(models) {
      Doctor.belongsTo(models.Department, { foreignKey: 'departments' });
    }
  }
  Doctor.init({
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.literal('gen_random_uuid()')
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    departments: DataTypes.ARRAY(DataTypes.STRING),
    isVerified: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};
