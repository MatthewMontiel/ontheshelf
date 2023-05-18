// required dependencies
const router = require("express").Router();
const authorize = require("../utils/authorize");

// loads up the home page log in request
router.get("/", (req, res) => {
  res.render("login");
});

router.get("/shelf", authorize, async (req, res) => {
  try {
    // Find the logged in user based on the session ID and return shelf data
    const userData = await User.findByPk(req.session.id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Game }],
    });
    const user = userData.get({ plain: true });
    res.render("shelf", {
      ...user,
      logged_in: true,
    });
    // tells what error occurred
  } catch (err) {
    res.status(500).json(err);
  }
});

// check for log in and authorize and redirect or move along
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/shelf");
    return;
  }
// return to home/log in if user not authorize
  res.render("login");
});


// future enhancement> gather all game data for master database cross ref?
// router.get("/", async (req, res) => {
//   try {
//     const gameData = await Game.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ["name"],
//         },
//       ],
//     });

//     const games = gameData.map((game) => game.get({ plain: true }));

//     res.render("homepage");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
