const mongoose = require("mongoose");
const sequelize = require("../config/db");

const addressSchema = new mongoose.Schema({
  name: String,
  phone: String,
  street: String,
  city: String,
  pincode: String,
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    default: () => `ORD-${Date.now()}`, 
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
  totalPrice: {
    type: Number,
  },
  paymentMode: {
    type: String,
    enum: ["COD", "Online"], 
    default: "COD",
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed", "Refunded"],
    default: "Pending",
  },
  deliveryStatus: {
    type: String,
    enum: [
      "Ordered",
      "Confirmed",
      "Packed",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ],
    default: "Ordered",
  },
  address: addressSchema, // single object (matches customer)
  orderedAt: {
    type: Date,
    default: Date.now,
  },
});

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
    },
    orders: [orderSchema],
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Admin", adminSchema);
