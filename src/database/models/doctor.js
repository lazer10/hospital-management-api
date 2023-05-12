const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    static associate({ Department }) {
      this.belongsTo(Department, { foreignKey: 'departments' });
    }
  }
  Doctor.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    departments: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    isVerified: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};
