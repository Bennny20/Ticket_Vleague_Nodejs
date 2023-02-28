import TicketType from "../model/TicketType.js";
import Stand from "../model/Stand.js";
import Match from "../model/Match.js";
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
      newTicketType.matchId = req.params.matchId;
      const saveTicketType = await newTicketType.save();
      try {
        await Match.findByIdAndUpdate(req.params.matchId, {
          $push: { ticketTypes: saveTicketType._id },
        });
      } catch (error) {
        next(error);
      }   
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

export const deleteTicketType = async (req, res, next) => {
  try {
    await TicketType.findByIdAndDelete(req.params.id);
    res.status(200).json("TicketType has been delete");
  } catch (error) {
    next(error);
  }
};

export const getByMatch = async (req, res, next) => {
  try {
    const match = await Match.findById(req.params.matchId);
    const ticketTypes = await Promise.all(
      stadium.Stands.map((stand) => {
        return Stand.findById(stand);
      })
    );
    res.status(200).json(ticketTypes);
  } catch (err) {
    next(err);
  }
};


export const getById = async (req, res, next) => {
  try {
    const ticketType = await TicketType.findById(req.params.id);
    res.status(200).json(ticketType);
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const ticketTypes = await TicketType.find();
    res.status(200).json(ticketTypes);
  } catch (err) {
    next(err);
  }
};