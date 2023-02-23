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

export const getRoundByTournament = async (req, res, next) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    // console.log(tournament)
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



