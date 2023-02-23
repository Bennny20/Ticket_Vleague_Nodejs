import Stadium from "../model/Stadium.js";
import Club from "../model/Club.js";

export const createStadium = async (req, res, next) => {
  const newStadium = new Stadium(req.body);
  try {
    const saveStadium = await newStadium.save();
    res.status(200).json(saveStadium);
  } catch (error) {
    next(error);
  }
};


export const updateStadium = async (req, res, next) => {
  try {
    const updateStadium = await Stadium.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateStadium);
  } catch (error) {
    next(error);
  }
};

export const deleteStadium = async (req, res, next) => {
  try {
    const stadium = await Stadium.findById(req.params.id);
    for (var x of stadium.Clubs) {
      try {
        const club = await Club.findById(x);
        club.stadiumId = "";
        await club.save();
      } catch (error) {
        next(error);
      }
    }
    await Stadium.findByIdAndDelete(req.params.id);
    res.status(200).json("Stadium has been delete.");
  } catch (error) {
    next(error);
  }
};

export const getStadium = async (req, res, next) => {
  try {
    const stadium = await Stadium.findById(req.params.id);
    res.status(200).json(stadium);
  } catch (error) {
    next(error);
  }
};

export const getAllStadium = async (req, res, next) => {
  try {
    const stadium = await Stadium.find();
    res.status(200).json(stadium);
  } catch (error) {
    next(error);
  }
};
