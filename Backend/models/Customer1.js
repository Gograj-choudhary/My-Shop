const mongoose = require("mongoose");

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
    default: () => `ORD-${Date.now()}`, // simple unique order ID
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
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
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed", "Refunded"],
    default: "Pending",
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "Online"],
    default: "COD",
  },
  address: addressSchema, // single object for order delivery
  orderedAt: {
    type: Date,
    default: Date.now,
  },
});

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: String,
    phone: Number,
    email: String,
    googleId: String,
    address: [addressSchema],
    cart: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    orders: [orderSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);
