/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customer', {
    idcustomer: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    customername: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
  }, {
    tableName: 'customer',
    underscored: true
  });
};
