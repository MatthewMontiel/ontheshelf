// required dependencies
const router = require("express").Router();
const { Game } = require("../../models");
const authorize = require("../../utils/authorize");

// posts a new game to database
router.post("/", authorize, async (req, res) => {
  try {
    const newGame = await Game.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newGame);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update game in database -- can we attach this to an "edit" btn
router.put("/:id", (req, res) => {
  Game.update(
    {
      title: req.body.title,
      minplayers: req.body.minplayers,
      maxplayers: req.body.maxplayers,
      difficulty: req.body.difficulty,
      ages: req.body.ages,
      playtime: req.body.playtime,
      comment: req.body.comment,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then((updatedGame) => {
    res.json(updatedGame);
  });
});

// delete game from database
router.delete("/:id", authorize, async (req, res) => {
  try {
    const gameData = await Game.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!gameData) {
      res.status(404).json({
        message: `Why would you try to destroy something that doesn't exist; that doesn't even make any sense, what are you doing`,
      });
      return;
    }
    res.status(200).json(gameData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
