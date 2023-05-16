const router = require("express").Router();
const authorize = require('../utils/authorize');

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/", async (req, res) => {
  try {
    const gameData = await Game.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const games = gameData.map((game) => game.get({ plain: true }));

    res.render("homepage");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/shelf', authorize, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Game }],
    });

    const user = userData.get({ plain: true });

    res.render('shelf', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// logged_in: req.session.logged_in WITHIN RES RENDER?

module.exports = router;
