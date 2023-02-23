import Club from "../model/Club.js";
import Stadium from "../model/Stadium.js";

export const createClub = async (req, res, next) => {
  const newClub = new Club(req.body);
  const stadiumId = req.body.stadiumId;
  try {
    const saveClub = await newClub.save();
    try {
      await Stadium.findByIdAndUpdate(stadiumId, {
        $push: { Clubs: saveClub._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(saveClub);
  } catch (error) {
    next(error);
  }
};

export const getClub = async (req, res, next) => {
  try {
    const club = await Club.findById(req.params.id);
    res.status(200).json(club);
  } catch (error) {
    next(error);
  }
};

export const updateClub = async (req, res, next) => {
  try {
    const clubOid = await Club.findById(req.params.id);
    const stadiumIdOld = clubOid.stadiumId;
    const stadiumId = req.body.stadiumId;

    const updateClub = await Club.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    try {
      await Stadium.findByIdAndUpdate(stadiumIdOld, {
        $pull: { Clubs: updateClub._id },
      });
    } catch (error) {
      next(error);
    }

    try {
      await Stadium.findByIdAndUpdate(stadiumId, {
        $push: { Clubs: updateClub._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(updateClub);
  } catch (error) {
    next(error);
  }
};

export const deleteClub = async (req, res, next) => {
  try {
    const club = await Club.findById(req.params.id);
    const stadiumId = club.stadiumId;
    await Club.findByIdAndDelete(req.params.id);
    try {
      await Stadium.findByIdAndUpdate(stadiumId, {
        $pull: { Clubs: club._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json("Club has been delete");
  } catch (error) {
    next(error);
  }
};

export const getAllClub = async (req, res, next) => {
  try {
    const club = await Club.find();
    res.status(200).json(club);
  } catch (error) {
    next(error);
  }
};
