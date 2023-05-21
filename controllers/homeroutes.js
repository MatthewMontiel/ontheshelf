// required dependencies
const router = require("express").Router();
const authorize = require("../utils/authorize");
const { User } = require("../models");
const { Game } = require("../models");

// loads up the home page log in request
// THIS WORKS
router.get("/", (req, res) => {
  res.render("login");
});

// pulls the user's games to display on the shelf once logged in
router.get("/shelf", authorize, async (req, res) => {
  try {
    // Find the logged in user based on the session ID and return their shelf data
    const userData = await User.findByPk(req.session.user_id, {
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

// pulls specific game on the shelf data to render in isolation once teh user is logged in
router.get("/game/:id", async (req, res) => {
  try {
    const gameData = await Game.findByPk(req.params.id, {
      include: [
        // maybe not needed; should't display?
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const game = gameData.get({ plain: true });
    res.render("project", {
      ...project,
      logged_in: req.session.logged_in,
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

// router.get("/list", async (req, res) => {
//    try {
//      const userData = await User.findAll();

//      const users = userData.map((user) => user.get({ plain: true }));

//      return users;
//    }
//    catch (err) {
//      res.status(500).json(err);
//    }
//  });

// THIS WORKS
router.get("/list", async (req, res) => {
  const userData = await User.findAll().catch((err) => {
    res.json(err);
  });
  const users = userData.map((user) => user.get({ plain: true }));

  res.json(users);
});

router.get("/box", async (req, res) => {
  const gameData = await Game.findAll().catch((err) => {
    res.json(err);
  });
  const games = gameData.map((game) => game.get({ plain: true }));

  res.json(games);
});

module.exports = router;
