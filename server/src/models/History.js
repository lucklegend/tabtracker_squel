const Promise = require('bluebird')
const pool = require('../db/pool')
const squel = require('squel').useFlavour('mysql')

const History = {
  find_history: async (search) => {
    return new Promise((resolve, reject) => {
      console.log('find_history', search)
      const query = squel.select()
        .from('histories')
        .left_join('songs', 's', 's.id = histories.SongId')
        .where('UserId =' + search.UserId)
        .toString()
      pool.query(query, (err, rows) => {
        if (err) {
          console.log('error pool query',err)
          reject(err)
        }
        resolve(rows)
      })
    })
  },
  insert: async (history) => {
    return new Promise((resolve, reject) => {
      const query = squel
        .insert({ replaceSingleQuotes: true })
        .into('histories')
        .setFields(history)
        // .setFieldsRows([bookmark.params])
        .toString()
      pool.query(query, (err, result) => {
        if (err) {
          reject(err)
          return
        }
        history.id = result.insertId
        resolve(history)
      })
    })
  },
}

module.exports = History
