const Order = require('../models/OrderSchema');
const Product = require('./ProductService');
const User = require('./UserService');


const createOrder = async (orderData) => {
  const order = new Order({
    user: orderData.user,
    products: [...orderData.products],
    shippingAddress: orderData.shippingAddress,
    paymentMethod: orderData.paymentMethod
  });

  let totalPrice = 0;

  for(const product of order.products){
    const {product: productId, quantity, size} = product;

    const foundProduct = await Product.getProductById(productId);
    if (!foundProduct) {
      throw new Error(`Product with ID ${productId} not found.`);
    }

    const sizeToUpdate = foundProduct.details.find(detail => detail.size === size);
    if (!sizeToUpdate) {
      throw new Error(`Size ${size} not available for product ${foundProduct.name}.`);
    }

    if (sizeToUpdate.quantityInStock < quantity) {
      throw new Error(`Insufficient quantity in stock for product ${foundProduct.name}, size ${size}.`);
    }

    sizeToUpdate.quantityInStock -= quantity;

    await foundProduct.save();

    totalPrice += foundProduct.price * quantity;
  }

  order.totalPrice = totalPrice;
  const savedOrder = await order.save();
  const user = await User.getUserById(savedOrder.user);
  user.orders.push(savedOrder._id);
  await user.save();
  return savedOrder;
};

const updateOrder = async (order) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(order._id, order, {new: true});
    if (!updatedOrder) {
      throw new Error(`Order with ID ${order._id} not found.`);
    }
    return updatedOrder;
  } catch (e) {
    console.log("OrderService:" + e);
  }
}
const getAllOrders = async () => {
  try {
    const orders = await Order.find().populate({
      path: 'user',
      select: '-isAdmin -password'
    })
      .populate({path: 'products.product', model: 'Product'});
    if (orders)
      return orders;
  } catch (e) {
    console.log("OderService:" + e);

  }
};

const getOrderById = async (orderId) => {
  const order = await Order.findById(orderId).populate({
    path: 'user',
    select: '-isAdmin -password'
  })
    .populate({path: 'products.product', model: 'Product'});
  if (!order) {
    console.log(`Order with ID ${orderId} not found.`);
  }
  return order;
};

const deleteOrder = async (orderId) => {
  const order = await Order.findByIdAndDelete(orderId);
  if (!order) {
    console.log(`Order with ID ${orderId} not found.`);
  }
  return order;
}

const filterOrders = async (filter) => {
  console.log(filter);
  try {
    const orders = await Order.find(filter).populate({
      path: 'user',
      select: '-isAdmin -password'
    })
      .populate({path: 'products.product', model: 'Product'});
    if (orders.length > 0)
      return orders;
  } catch (e) {
    console.log("OderService:" + e);

  }
}
const groupByField = async (field) => {
  try {
    let groupField = "";
    let projectionField = "";

    if (field === "category") {
      groupField = "$productInfo.category";
      projectionField = "category";
    } else if (field === "totalPrice") {
      groupField = null;
      projectionField = "Total Price";
    } else if (field === "createdAt") {
      groupField = { $dateToString: { format: "%Y-%m", date: "$createdAt" } };
      projectionField = "Month";
    }

    const pipeline = [
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "productInfo"
        }
      },
      {
        $unwind: "$productInfo" // similar to join
      },
      {
        $group: {
          _id: groupField,
          count: { $sum: 1 },
          totalPrice: { $sum: "$totalPrice" },
        }
      },
      {
        $project: {
          _id: 1,
          count: 1,
          totalPrice: { $round: ["$totalPrice", 2] }
        }
      }
    ];

    const result = await Order.aggregate(pipeline);
    return result;
  } catch (error) {
    throw new Error('Error occurred while aggregating orders by field');
  }
};



module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  filterOrders,
  groupByField

}
