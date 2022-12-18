'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class similar_word extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  similar_word.init({
    name: DataTypes.STRING,
    a: DataTypes.STRING,
    b: DataTypes.STRING,
    c: DataTypes.STRING,
    d: DataTypes.STRING,
    answer: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'similar_word',
  });
  return similar_word;
};