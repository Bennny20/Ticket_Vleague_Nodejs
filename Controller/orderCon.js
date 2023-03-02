import Order from "../model/Order.js";
import OrderDetail from "../model/OrderDetail.js";
import User from "../model/User.js";

export const createOrder = async (req, res, next) => {
  const newOrder = new Order(req.body);
  const user = await User.findById(req.body.customerId);

  newOrder.name = user.username;
  newOrder.quantity = newOrder.orderDeatails.length;
  newOrder.date - Date.now();

  for (var x of newOrder.orderDeatails) {
    const orderDetail = await OrderDetail.findById(x)
    newOrder.totalPrice += orderDetail.total;
  }
  try {
    const saveOrder = await newOrder.save();
    res.status(200).json(saveOrder);
  } catch (error) {
    next(error);
  }
};
