import React from 'react';
import axios from 'axios'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      selectedGenre: null,
      genreIds: {}
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }
  componentDidMount() {
    this.getGenres()
  }
  handleSearch() {
    console.log('Searching for ', this.state.selectedGenre)
    this.props.handleSearch(this.state.genreIds[this.state.selectedGenre])
  }
  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    console.log('getting genres')
    axios.get('/genres')
      .then((res) => {
        console.log('got genres', res)
        this.setState({genres: res.data.map(genre => genre.name), selectedGenre: res.data[0].name})
        var ids = {}
        for (var genre of res.data) {
          ids[genre.name] = genre.id
        }
        this.setState({genreIds: ids})
      })
      .catch((err) => {
        console.log('ERROR GETTING GENRES', err)
      })
  }
  handleSelect(evt) {
    this.setState({selectedGenre: evt.target.value})
  }
  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>
{/* 


    Make the select options dynamic from genres !!!

    How can you tell which option has been selected from here?

*/}

        <select onChange={this.handleSelect}>
          {this.state.genres.map((genre) => (
            <option value={genre}>{genre}</option>
          ))}
        </select>
        <br/><br/>

        <button onClick={this.handleSearch}>Search</button>

      </div>)
  }
}

export default Search