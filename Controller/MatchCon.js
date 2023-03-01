import Match from "../model/Match.js";
import Round from "../model/Round.js";
import Club from "../model/Club.js";
import Stafium from "../model/Stadium.js";

export const createMatch = async (req, res, next) => {
  const newMatch = new Match(req.body);
  const homeClub = await Club.findById(req.body.homeClubId);
  const awayClub = await Club.findById(req.body.awayClubId);
  const stadium = await Stafium.findById(req.body.stadiumId);
  newMatch.nameHomeClub = homeClub.name;
  newMatch.logoHomeClub = homeClub.logo;
  newMatch.nameAwayClub = awayClub.name;
  newMatch.logoAwayClub = awayClub.logo;
  newMatch.nameStadium = stadium.name;
  
  try {
    const saveMatch = await newMatch.save();
    try {
      await Round.findByIdAndUpdate(req.body.roundId, {
        $push: { matchs: saveMatch._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(saveMatch);
  } catch (error) {
    next(error);
  }
};

export const updateMatch = async (req, res, next) => {
  try {
    const matchOid = await Match.findById(req.params.id);
    const roundOld = matchOid.roundId;
    const roundNewId = req.body.roundId;
    const homeClub = await Club.findById(req.body.homeClubId);
    const awayClub = await Club.findById(req.body.awayClubId);
    const stadium = await Stafium.findById(req.body.stadiumId);

    const updateMatch = await Match.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
        nameHomeClub: homeClub.name,
        logoHomeClub: homeClub.logo,
        nameAwayClub: awayClub.name,
        logoAwayClub: awayClub.logo,
        nameStadium: stadium.name,
      },
      { new: true }
    );

    try {
      await Round.findByIdAndUpdate(roundOld, {
        $pull: { matchs: updateMatch._id },
      });
    } catch (error) {
      next(error);
    }

    try {
      await Round.findByIdAndUpdate(roundNewId, {
        $push: { matchs: updateMatch._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(updateMatch);
  } catch (error) {
    next(error);
  }
};

export const deleteMatch = async (req, res, next) => {
  try {
    const match = await Match.findById(req.params.id);
    const roundId = match.roundId;
    await Match.findByIdAndDelete(req.params.id);

    try {
      await Round.findByIdAndUpdate(roundId, {
        $pull: { matchs: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json("Match has been delete.");
  } catch (error) {
    next(error);
  }
};

export const getMatchByRound = async (req, res, next) => {
  try {
    const round = await Round.findById(req.params.roundid);
    const matchs = await Promise.all(
      round.matchs.map((match) => {
        return Match.findById(match);
      })
    );
    res.status(200).json(matchs);
  } catch (err) {
    next(err);
  }
};

export const getMatchByID = async (req, res, next) => {
  try {
    const match = await Match.findById(req.params.id);
    res.status(200).json(match);
  } catch (err) {
    next(err);
  }
};

export const getMatch = async (req, res, next) => {
  try {
    const match = await Match.find();
    res.status(200).json(match);
  } catch (err) {
    next(err);
  }
};
