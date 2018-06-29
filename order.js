/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('order', {
    idorder: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    orderdesc: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    customer_idcustomer: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'customer',
        key: 'idcustomer'
      }
    }
  }, {
      tableName: 'order',
      underscored: true
    });
}
