import Match from "../model/Match.js";
import Round from "../model/Round.js";
import Club from "../model/Club.js";
import Stadium from "../model/Stadium.js";

export const createMatch = async (req, res, next) => {
  const roundId = req.body.roundId;
  console.log(roundId);
  const newMatch = new Match(req.body);
  try {
    const saveMatch = await newMatch.save();
    try {
      await Round.findByIdAndUpdate(roundId, {
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

export const getMatchByRound = async (req, res, next) => {
  try {
    const round = await Round.findById(req.params.id);
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
