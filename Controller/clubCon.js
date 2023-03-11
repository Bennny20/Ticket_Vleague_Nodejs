import Club from "../model/Club.js";
import Stadium from "../model/Stadium.js";

export const createClub = async (req, res, next) => {
  const newClub = new Club(req.body);
  const stadium = await Stadium.findById(req.body.stadiumId);
  // newClub.nameStadium = stadium.name;
  newClub.logo = req.file.path;
  // console.log(req.file);
  try {
    const saveClub = await newClub.save();
    try {
      await Stadium.findByIdAndUpdate(stadium._id, {
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
  const clubOid = await Club.findById(req.params.id);
  var nameStaium = clubOid.nameStadium;
  try {
    //update stadium.clubs
    if (req.body.stadiumId != undefined) {
      const stadiumIdOld = clubOid.stadiumId;
      const stadium = await Stadium.findById(req.body.stadiumId);
      nameStaium = stadium.name;

      // update clubs old in stadium.Clubs
      try {
        await Stadium.findByIdAndUpdate(stadiumIdOld, {
          $pull: { Clubs: clubOid._id },
        });
      } catch (error) {
        next(error);
      }

      try {
        await Stadium.findByIdAndUpdate(stadium._id, {
          $push: { Clubs: clubOid._id },
        });
      } catch (error) {
        next(error);
      }
    }
    if (req.file) {
      await Club.findByIdAndUpdate(
        req.params.id,
        { logo: req.file.path },
        { new: true }
      );
    }

    const updateClub = await Club.findByIdAndUpdate(
      req.params.id,
      { $set: req.body, nameStadium: nameStaium },
      { new: true }
    );
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
        $pull: { Clubs: req.params.id },
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
