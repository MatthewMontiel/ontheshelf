const router = require('express').Router();
const { GameShelf } = require('../../models');
const authorize = require("../../utils/authorize")
// auth?

router.post('/', authorize, async (req, res) => {
   try {
     const newGameShelf = await GameShelf.create({
       ...req.body,
       user_id: req.session.user_id,
     });
 
     res.status(200).json(newGameShelf);
   } catch (err) {
     res.status(400).json(err);
   }
});

router.delete('/:id', authorize, async (req, res) => {
   try {
     const gameShelfData = await gameShelf.destroy({
       where: {
         id: req.params.id,
         user_id: req.session.user_id,
       },
     });
 
     if (!gameShelfData) {
       res.status(404).json({ message: `why would you try to destroy something that doesn't exist that doesn't even make any sense what are you doing` });
       return;
     }
 
     res.status(200).json(gameShelfData);
   } catch (err) {
     res.status(500).json(err);
   }
});
 
module.exports = router;