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

const orderModel = require('./order')(sequelize, Sequelize);

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
        orderModel.findAll().then(ord => {
            resolve(ord[0].orderdesc)
        });
    });
};

exports.update = function (order) {
    return new Promise(function (resolve, reject) {
        orderModel.insertOrUpdate(order)
            .then(ord => {
                resolve(ord);
            });
    });
}