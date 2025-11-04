const { DataTypes } = require('sequelize');
const sequelize = require("../config/db");

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderId: {
    type: DataTypes.STRING,
    unique: true,
    defaultValue: () => `ORD-${Date.now()}`,
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'customers',
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
    },
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  paymentMode: {
    type: DataTypes.ENUM('COD', 'Online'),
    defaultValue: 'COD',
  },
  paymentStatus: {
    type: DataTypes.ENUM('Pending', 'Paid', 'Failed', 'Refunded'),
    defaultValue: 'Pending',
  },
  deliveryStatus: {
    type: DataTypes.ENUM(
      'Ordered',
      'Confirmed',
      'Packed',
      'Shipped',
      'Out for Delivery',
      'Delivered',
      'Cancelled'
    ),
    defaultValue: 'Ordered',
  },
  // Address fields stored directly in order
  addressName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  addressPhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  addressStreet: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  addressCity: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  addressPincode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  orderedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'orders',
  timestamps: false,
});

module.exports = Order;