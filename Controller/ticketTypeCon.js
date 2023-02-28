import TicketType from "../model/TicketType.js";
import Stand from "../model/Stand.js";
import { createError } from "../utils/error.js";

export const createTicketType = async (req, res, next) => {
  const newTicketType = new TicketType(req.body);
  const stand = await Stand.findById(newTicketType.stand);

  try {
    if (stand.quantitySeat < newTicketType.quantity) {
      return next(
        createError(
          401,
          "The quantity of tickets is more than the number of seats"
        )
      );
    } else {
      newTicketType.TicketTypeId = req.params.TicketTypeId;
      const saveTicketType = await newTicketType.save();
      res.status(200).json(saveTicketType);
    }
  } catch (error) {
    next(error);
  }
};

export const updateTicketType = async (req, res, next) => {
  const ticketType = await TicketType.findById(req.params.id);
  const stand = await Stand.findById(ticketType.stand);

  if (req.body.quantity != undefined) {
    if (stand.quantitySeat < req.body.quantity) {
      return next(
        createError(
          401,
          "The quantity of tickets is more than the number of seats"
        )
      );
    }
  }

  try {
    const updateTicketType = await TicketType.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateTicketType);
  } catch (error) {
    next(error);
  }
};
