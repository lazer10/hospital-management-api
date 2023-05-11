// eslint-disable-next-line import/no-import-module-exports
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    static associate({ Doctor }) {
      this.hasMany(Doctor, { foreignKey: 'departments' });
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
