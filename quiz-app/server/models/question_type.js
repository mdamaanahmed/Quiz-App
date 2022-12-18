'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class question_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  question_type.init({
    name: DataTypes.STRING,
    time: DataTypes.INTEGER,
    table_name: DataTypes.STRING,
    last_question: DataTypes.INTEGER,
    logo: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'question_type',
  });
  return question_type;
};