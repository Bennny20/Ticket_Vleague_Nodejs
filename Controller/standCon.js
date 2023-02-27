import Stand from "../model/Stand.js";
import Stadium from "../model/Stadium.js";

export const createStand = async (req, res, next) => {
  const newStand = new Stand(req.body);
  try {
    newStand.stadiumId = req.params.stadiumId;
    try {
      await Stadium.findByIdAndUpdate(newStand.stadiumId, {
        $push: { Stands: newStand._id },
      });
    } catch (error) {
      next(error);
    }
    const saveStand = await newStand.save();
    res.status(200).json(saveStand);
  } catch (error) {
    next(error);
  }
};

export const getByStadium = async (req, res, next) => {
  try {
    const stadium = await Stadium.findById(req.params.stadiumId);
    const stands = await Promise.all(
      stadium.Stands.map((stand) => {
        return Stand.findById(stand);
      })
    );
    res.status(200).json(stands);
  } catch (err) {
    next(err);
  }
};

export const getStand = async (req, res, next) => {
  try {
    const stand = await Stand.findById(req.params.id);
    res.status(200).json(stand);
  } catch (error) {
    next(error);
  }
};
