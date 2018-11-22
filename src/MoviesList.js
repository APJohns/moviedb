import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Movie from './Movie';

class MoviesList extends PureComponent {
  state = {
    movies: [],
    input: '',
  }

  async componentDidMount() {
    try {
      const res = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=2d78e93594e3964f5a7589dbaedc9c39&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1');
      const movies = await res.json();
      this.setState({
        movies: movies.results,
      });
    } catch (e) {
      console.log(e);
    }
  }

  find = async (event) => {
    this.setState({
      input: this.text.value,
    });
    try {
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=2d78e93594e3964f5a7589dbaedc9c39&language=en-US&query=${event.target.value}&page=1&include_adult=false`);
      const movies = await res.json();
      this.setState({
        movies: movies.results,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <SearchBar type="search" ref={input => this.text = input} onChange={this.find} value={this.state.input} placeholder="Find a movie..." />
        <MovieGrid>
          {this.state.movies.map(movie => <Movie key={movie.id} movie={movie} />)}
        </MovieGrid>
      </div>
    );
  }
}

export default MoviesList;

const SearchBar = styled.input`
  margin: 50px 0;
  width: 75%;
  font-size: 1.5rem;
  padding: 5px 10px;
  border-radius: 2px;
  border: none;
  border-bottom: 2px solid #b33939;
  background-color: rgba(255, 255, 255, 0.1);
  color: #eee;
  transition: 0.2s all ease;

  &:focus {
    border-bottom: 2px solid #227093;
    background-color: rgba(255, 255, 255, 0.2);
    transition: 0.2s all ease;
  }

  @media (max-width: 600px) {
    width: 85%;
  }
`;


const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 1rem;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 350px) {
    grid-template-columns: 1fr;
  }
`;
