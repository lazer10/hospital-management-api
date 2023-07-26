const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate() {
    }
  }
  User.init({
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.literal('gen_random_uuid()')
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      afterCreate: (record) => {
        // eslint-disable-next-line no-param-reassign
        delete record.dataValues.password;
      },
      afterUpdate: (record) => {
        // eslint-disable-next-line no-param-reassign
        delete record.dataValues.password;
      },
    }
  });
  return User;
};
