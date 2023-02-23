import Stadium from "../model/Stadium.js";

export const createStadium = async (req, res, next) => {
  const newStadium = new Stadium(req.body);
  try {
    const saveStadium = await newStadium.save();
    res.status(200).json(saveStadium);
  } catch (error) {
    next(error);
  }
};



