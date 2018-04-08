var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
var axios = require('axios')
var db = require('./database.js')

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

// Due to express, when you load the page, it doesnt make a get request to '/', it simply serves up the dist folder
app.get('/search', function(req, res) {
    //get the search genre     

    //https://www.themoviedb.org/account/signup

    // use this endpoint to search for movies by genres, you will need an API key

    //https://developers.themoviedb.org/3/discover/movie-discover

    //and sort them by horrible votes using the search parameters in the API
    console.log('/search GET request', req.query.genre)
    axios.get(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
            api_key: 'ea4f3b12142e2e813e0c38d34fdf0ecb',
            with_genres: req.query.genre,
            sort_by: 'popularity.asc'
        }
    }).then(genresRes => {
        console.log('movies ', genresRes.data)
        var data = genresRes.data.results.map(movie => ({
            'title': movie.title,
            'year': movie.release_date.split('-')[0],
            'rating': movie.vote_average,
            'img_url': movie.poster_path
        }))
        res.send(200, data)
    })
    .catch(err => console.log(err))
})

app.get('/genres', function(req, res) {
    //make an axios request to get the list of official genres

    // from this endpoint https://developers.themoviedb.org/3/genres/get-movie-list which needs your api key

    //send back
    console.log('/genres GET request')
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${'ea4f3b12142e2e813e0c38d34fdf0ecb'}`)
        .then(genresRes => {
            //console.log('genres ', genresRes.data.genres)
            res.send(200, genresRes.data.genres)
        })
        .catch(err => console.log(err))
})

app.get('/favorites', function(req, res) {
    //make an axios request to get the list of official genres

    // from this endpoint https://developers.themoviedb.org/3/genres/get-movie-list which needs your api key

    //send back
    console.log('/favorites GET request')
    db.getAllFavorites((dbResults) => {
        console.log('DATABASE FAVORITES RESULTS', dbResults)
        res.send(dbResults)
    })
})



app.post('/save', function(req, res) {
    console.log('/save POST request')
    console.log(req.body)
    db.saveFavorite(req.body, (dbres) => {
        console.log('SAVED TO DATABASE')
        res.send(200, 'successfully saved')
    })
})

app.post('/delete', function(req, res) {
    console.log('/delete POST request')
    console.log(req.body)
    db.deleteFavorite(req.body.id, (dbres) => {
        console.log('DELTED FROM DATABASE', dbres)
        res.send(200)
    })
})
app.listen(3000, function() {
  console.log('listening on port 3000!');
});