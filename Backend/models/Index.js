const Admin = require('./Admin');
const Customer =require('./Customer');
const Product = require('./Product');  
const Cart = require('./Cart');
const Order = require('./Order');
const Address = require('./Address');

// Admin to Product relation 
Admin.hasMany(Product, {
    foreignKey: 'adminId',
    as: 'products',
});

Product.belongsTo(Admin, {
    foreignKey: 'adminId',
    as: 'admin',
})

// Customer to Address relation
Customer.hasMany(Address, {
    foreignKey: 'customerId',
    as: 'addresses',
})
Address.belongsTo(Customer, {
    foreignKey: 'customerId',
    as: 'customers',
})

// Customer to Cart relation 
Customer.hasMany(Cart, {
    foreignKey: 'customerId',
    as: 'carts',
})
Cart.belongsTo(Customer, {
    foreignKey: 'customerId',
    as: 'customer',
});

// product to Cart
Product.hasMany(Cart, {
    foreignKey: 'productId',
    as: 'carts',
})
Cart.belongsTo(Product, {
    foreignKey: 'productId',
    as: 'product',
});

// Customer -> Order (one-to-many)
Customer.hasMany(Order, {
  foreignKey: 'customerId',
  as: 'orders',
});
Order.belongsTo(Customer, {
  foreignKey: 'customerId',
  as: 'customer',
});

// Product -> Order (one-to-many)
Product.hasMany(Order, {
  foreignKey: 'productId',
  as: 'orders',
});
Order.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product',
});


module.exports = {
    Admin,
    Customer,
    Product,
    Cart,
    Order,
    Address
}