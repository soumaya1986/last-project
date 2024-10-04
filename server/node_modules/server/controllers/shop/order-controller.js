const stripe = require("stripe")(
  "sk_test_51MhaLdDuR3YHMAMLAzMXHGcRBHcF3HIXWkgz5ZAbGXTq3XZv3D76rcI3jX4wqdyPUGbwKx7q86dGqZL4JvBSDWtp00b4GsEfUN"
);
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
// start payment
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      cartId,
    } = req.body;
    // console.log(JSON.stringify(req.body, null, 2))

    // Create the order first
    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod: "stripe",
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
    });

    await newlyCreatedOrder.save();

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // You can add other methods like 'ideal' for bank transfers
      mode: "payment",
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
          },
          unit_amount: Math.round(item.price * 100), // Amount in cents
        },
        quantity: item.quantity,
      })),
      success_url: `http://localhost:5173/shop/payment-return/{CHECKOUT_SESSION_ID}/${newlyCreatedOrder._id}`,
      cancel_url: "http://localhost:5173/shop/checkout-cancel",
    });

    // Store the paymentId (session.id) in the order
    newlyCreatedOrder.paymentId = session.id;
    await newlyCreatedOrder.save();

    res.status(201).json({
      success: true,
      url: session.url, // Return the Stripe Checkout URL
      orderId: newlyCreatedOrder._id,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { sessionId, orderId } = req.body;

    console.log("=====================================================");
    console.log("Order ID:", orderId);
    console.log("Session ID:", sessionId);
    console.log("=====================================================");

    // Retrieve the checkout session from Stripe
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    // Check if the payment status is not 'unpaid'
    if (checkoutSession.payment_status !== "unpaid") {
      const paymentIntentId = checkoutSession.payment_intent;
      console.log("Payment Intent ID:", paymentIntentId);

      // Find the order by orderId
      let order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      // Update the order with the payment status, payment ID, and mark it as confirmed
      order.paymentStatus = "paid"; // Mark payment as complete
      order.orderStatus = "confirmed"; // Mark the order as confirmed
      order.paymentId = paymentIntentId; // Store the payment intent ID

      // Loop through order items and update stock for each product
      for (let item of order.cartItems) {
        let product = await Product.findById(item.productId);

        // If product is not found, return an error
        if (!product) {
          return res.status(404).json({
            success: false,
            message: `Not enough stock for product ${item.productId}`,
          });
        }

        // Deduct the purchased quantity from the total stock
        product.totalStock -= item.quantity;
        await product.save();
      }

      // Remove the cart after successful order confirmation
      const getCartId = order.cartId;
      await Cart.findByIdAndDelete(getCartId);

      // Save the updated order
      await order.save();

      res.status(200).json({
        success: true,
        message: "Order confirmed and payment captured successfully",
        data: order,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment not completed. Please try again.",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};
