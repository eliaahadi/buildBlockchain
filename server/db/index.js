const environment = process.env.NODE_ENV || 'development';
const Knex = require('knex');
const config = require('./knexfile.js');

const knex = Knex(config[environment]);

// module.exports = db


////from DB Part2
// const Knex = require('knex');

module.exports = {

    // initialize a connection to the database, and pass this
    // to the various submodules within
    // customer: require('./queries/customer')(knex),
    // fridge_inventory: require('./queries/fridge_inventory')(knex),
    // order: require('./queries/order')(knex),
    // order_products: require('./queries/order_products')(knex),
    // product: require('./queries/product')(knex),
    // supermarket: require('./queries/supermarket')(knex)
};
