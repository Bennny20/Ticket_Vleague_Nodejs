import Order from "../model/Order.js";
import User from "../model/User.js";

export const createOrder = async (req, res, next) => {
  const newOrder = new Order(req.body);
  const user = await User.findById(req.body.customerId);

  newOrder.name = user.name;
  newOrder.quantity = newOrder.orderDeatails.length();
  newOrder.date - Date.now();
  try {
    const saveOrder = await newOrder.save();
    res.status(200).json(saveClub);
  } catch (error) {
    next(error);
  }
};
