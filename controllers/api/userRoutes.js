// required dependencies
const router = require("express").Router();
const { User } = require("../../models");

// make a new user and save session data
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
    // catch error to tell what was wrong
  } catch (err) {
    res.status(400).json(err);
  }
});

// log into on the shelf
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    // check for existing email
    if (!userData) {
      res
        .status(400)
        .json({ alert: `I'M AFRAID I CAN'T ACCEPT THAT INPUT, DAVE` });
      return;
    }
    // check for matching password
    const goodPassword = await userData.checkPassword(req.body.password);
    if (!goodPassword) {
      res
        .status(400)
        .json({ message: `I'M AFRAID I CAN'T ACCEPT THAT INPUT, DAVE` });
      return;
    }
    // if good log in
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: "YES! YES! YES!" });
    });
    // catch error to tell what was wrong
  } catch (err) {
    res.status(400).json(err);
  }
});

// log out of on the shelf
router.post("/logout", (req, res) => {
  // on log out and destroy session data
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res
        .status(204)
        .json({ message: "NEVER SHOW YOUR FACE HERE AGAIN" })
        .end();
    });
    // return an error if something happens
  } else {
    res.status(404).end();
  }
});

module.exports = router;
