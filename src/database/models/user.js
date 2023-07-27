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
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    userName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phone_number: {
      allowNull: false,
      type: DataTypes.STRING
    },
    isVerified: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    }
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
