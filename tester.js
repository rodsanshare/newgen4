require('dotenv/config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    operatorsAliases: false,
    define: {
        timestamps: false,
        freezeTableName: true
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

});

const customerModel =
    sequelize.define('customer', {
        idcustomer: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        customername: {
            type: Sequelize.STRING(45),
            allowNull: true
        }
    }, {
            tableName: 'customer',
            underscored: true,
        });

const orderModel =
    sequelize.define('order', {
        idorder: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        orderdesc: {
            type: Sequelize.STRING(45),
            allowNull: true
        },
        customer_idcustomer: {
            type: Sequelize.INTEGER(11),
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

customerModel.hasMany(orderModel);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

exports.get = function () {
    return new Promise(function (resolve, reject) {
        customerModel.findAll({
            raw: true,
            include: [{
                model: orderModel
            }],

        }).then(r => { resolve(r) });
    });
};