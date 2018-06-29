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

const customerModel = require('./customer')(sequelize, Sequelize);
const orderModel = require('./order')(sequelize, Sequelize);
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
        customerModel.findAll().then(cus => {
            resolve(cus[0].customername)
        });
    });
};

exports.getOrders = function (id) {
    return new Promise(function (resolve, reject) {
        customerModel.findAll({            
            raw: true,
            include: [{
                model: orderModel,
                where: { customer_idcustomer: id }                
            }],

        }).then(r => { resolve(r) });
    });
};