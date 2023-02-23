import Round from "../model/Round.js";
import Tournament from "../model/Tournament.js";

export const createRound = async (req, res, next) => {
  const tournamentId = req.body.tournamentId;
  const newRound = new Round(req.body);
  try {
    const saveRound = await newRound.save();
    try {
      await Tournament.findByIdAndUpdate(tournamentId, {
        $push: { rounds: saveRound._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(saveRound);
  } catch (error) {
    next(error);
  }
};

export const deleteRound = async (req, res, next) => {
  try {
    const round = await Round.findById(req.params.id);
    const tournamentId = round.tournamentId;
    await Round.findByIdAndDelete(req.params.id);
    try {
      await Tournament.findByIdAndUpdate(tournamentId, {
        $pull: { rounds: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json("Round has been delete");
  } catch (error) {
    next(error);
  }
};

export const getRoundByTournament = async (req, res, next) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    const rounds = await Promise.all(
      tournament.rounds.map((round) => {
        return Round.findById(round);
      })
    );
    res.status(200).json(rounds);
  } catch (err) {
    next(err);
  }
};



