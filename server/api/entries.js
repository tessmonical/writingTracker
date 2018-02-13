const router = require('express').Router()
const { WordcountEntry } = require('../db/models')
module.exports = router

router.get('/all', (req, res, next) => {
  if (!req.user.id) return res.send(403);
  WordcountEntry.findAll({
    where: {
      userId: req.user.id,
    }
  })
    .then((wordcountEntries) => {
      if (wordcountEntries) return res.json(wordcountEntries);
      else res.send([]);
    })
    .catch(next);
})

router.get('/:id', (req, res, next) => {
  if (!req.user.id) return res.send(403);
  WordcountEntry.findOne({
    where: {
      id: Number(req.params.id),
      userId: req.user.id,
    },
  })
    .then((wordcountEntry) => {
      if (wordcountEntry) return res.json(wordcountEntry);
      else res.send(404);
    })
    .catch(next);
})
