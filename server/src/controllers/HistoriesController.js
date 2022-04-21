const History = require('../models/History')
const _ = require('lodash')

module.exports = {
  async index(req, res) {
    try {
      const { userId } = req.query
      console.log('history index', `${userId}`)
      const search = {
        UserId: userId
      }
      const history = await History.find_history(search)
      if (!history) {
        return res.status(403).send({
          error: 'Error occured while trying to get history', history
        })
      }
      // res.send(history)
      res.send(_.uniqBy(history, history=>history.SongId))
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error has occurered trying to get history' + err
      })
    }
  },
  async post(req, res) {
    try {
      const history = await History.insert(req.body)
      res.send(history)
    } catch (err) {
      res.status(400).send({
        error: 'Error while saving the history.', err
      })
    }
  }
}
