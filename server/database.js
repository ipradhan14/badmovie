const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getAllFavorites = function(callback) {
  //get favorites from the database
  connection.query('SELECT * FROM favorites', function(err, res, fields) {
    if (err) {
      console.log('DATABASE QUERY ERROR', err)
    }
    console.log('DATABASE FAVORITE RESULTS', res)
    callback(res)
  })
};
const saveFavorite = function(movie, callback) {
  //get favorites from the database
  connection.query('INSERT INTO favorites (title, year, rating, img_url) VALUES (?, ?, ?, ?)',
    [movie.title, movie.year, movie.rating, movie.img_url], function(err, res, fields) {
      if (err) {
        console.log('DATABASE INSERT ERROR', err)
      }
      console.log('DATABASE INSERTED SAVED FAVORITE')
      callback(res)
    })
};
const deleteFavorite = function(id, callback) {
  //get favorites from the database
  connection.query('DELETE FROM favorites WHERE id = ' + id.toString(), function(err, res, fields) {
    if (err) {
      console.log('DATABASE DLETEE ERROR', err)
    }
    console.log('DELETED FROM DB', res)
    callback(res)
  })
};
module.exports = {
  getAllFavorites: getAllFavorites,
  saveFavorite: saveFavorite,
  deleteFavorite: deleteFavorite
};