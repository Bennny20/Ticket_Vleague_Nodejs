import OrderDetail from "../model/OrderDetail.js";
import Order from "../model/Order.js";
import TicketType from "../model/TicketType.js";

export const createOrderDetail = async (req, res, next) => {
  const newOrderDetail = new OrderDetail(req.body);
  const ticket = await TicketType.findById(req.body.ticketTypeId);

  newOrderDetail.total = ticket.price * newOrderDetail.amount;

  try {
    const saveOrderDetail = await newOrderDetail.save();
    try {
      await Order.findByIdAndUpdate(req.body.orderId, {
        $push: { orderDeatails: saveOrderDetail._id },
      });
    } catch (error) {
      next(error);
    }

    const order = await Order.findById(req.body.orderId);
    var tototalOrder = order.totalPrice;
    const quantity = order.orderDeatails.length;
    tototalOrder = tototalOrder + newOrderDetail.total;

    await Order.findByIdAndUpdate(
      req.body.orderId,
      {
        quantity: quantity,
        totalPrice: tototalOrder,
      },
      { new: true }
    );
    res.status(200).json(saveOrderDetail);
  } catch (error) {
    next(error);
  }
};
