import Tournament from "../model/Tournament.js";


export const createTournament = async (req, res, next) => {
  const newTournament = new Tournament(req.body);
  try {
    const saveTournament = await newTournament.save();
    res.status(200).json(saveTournament);
  } catch (error) {
    next(error);
  }
};

export const updateTournament = async (req, res, next) => {
  try {
    const updateTournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateTournament);
  } catch (error) {
    next(error);
  }
};

