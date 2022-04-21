const Bookmark = require('../models/Bookmark')
const _ = require('lodash')

module.exports = {
  async index(req, res) {
    try {
      // const userId = req.user.id
      const { userId, songId } = req.query
      console.log('bookmark index', `${userId} ${songId}`)
      const search = {
        UserId: userId
      }
      if (songId) {
        search.SongId = songId
      }
      console.log(search)

      const bookmark = await Bookmark.find_bookmark(search)
      if (!bookmark) {
        return res.status(403).send({
          error: 'Error occured while trying to get bookmark'
        })
      }
      res.send(bookmark)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error has occurered trying to get bookmark' + err
      })
    }
  },
  async showall(req, res) {
    try {
      // const userId = req.user.id
      const { userId } = req.query
      const search = {
        UserId: userId
      }

      const bookmark = await Bookmark.find_Allbookmark(search)
      if (!bookmark) {
        return res.status(403).send({
          error: 'Error occured while trying to get all bookmark'
        })
      }
      // res.send(bookmark)
      res.send(_.uniqBy(bookmark, bookmark=>bookmark.SongId))
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error has occurered trying to get all bookmark' + err
      })
    }
  },
  async post(req, res) {
    try {
      console.log(req)
      const bookmark = await Bookmark.insert(req.body)
      res.send(bookmark)
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Error while saving the bookmark.'
      })
    }
  },
  async remove(req, res) {
    try {
      const { bookmarkId } = req.params
      const bookmark = await Bookmark.delete(bookmarkId)
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to delete the bookmark'
      })
    }
  }
}
