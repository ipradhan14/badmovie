import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [],
      favorites: [],
      showFaves: false
  	}

    this.getMovies = this.getMovies.bind(this)
    this.saveMovie = this.saveMovie.bind(this)
    this.deleteMovie = this.deleteMovie.bind(this)
    this.swapFavorites = this.swapFavorites.bind(this)
    this.getFavorites = this.getFavorites.bind(this)
  }

  getFavorites() {
    axios.get('/favorites')
      .then(res => {
        console.log('GOT FAVORITES', res)
        this.setState({favorites: res.data})
      })
  }

  componentDidMount() {
    this.getFavorites()
  }

  getMovies(genreId) {
    //make an axios request to your server on the GET SEARCH endpoint
    console.log('GETTING MOVIES', genreId)

    axios.get('/search', {params: {genre: genreId}})
        .then(res => {
          console.log('search returned movies', res.data)
          this.setState({movies: res.data, showFaves: false})
      })
  }

  saveMovie(movie) {
    //same as above but do something diff
    console.log('SAVING MOVIE', movie)
    axios.post('/save', movie)
    .then((res) => {
      console.log('SAVE MOVIE AXIOS REQUEST RETURNED ', res)
      this.getFavorites()
    })
  }

  deleteMovie(movie) {
    //same as above but do something diff
    console.log('DELETING MOVIE', movie)
    axios.post('/delete', movie)
      .then(res => {
        console.log('DELETE SUCCESSFUL')
        this.getFavorites()
      })
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    })
  }

  render () {
  	return (
    <div className="app">
      <header className="navbar"><h1>Bad Movies</h1></header> 
      
      <div className="main">
        <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} handleSearch={this.getMovies}/>
        <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}
          handleClick={this.state.showFaves ? this.deleteMovie : this.saveMovie}/>
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));