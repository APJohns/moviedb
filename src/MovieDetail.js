import React, { Component } from 'react';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import { Poster } from './Movie';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

class MoviesDetail extends Component {
  state = {
    movie: {},
  }

  async componentDidMount() {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=2d78e93594e3964f5a7589dbaedc9c39&language=en-US`);
      const movie = await res.json();
      this.setState({
        movie,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { movie } = this.state;
    return (
      <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
        <MovieInfo>
          <Overdrive id={movie.id}>
            <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
          </Overdrive>
          <div>
            <h1>{movie.title}</h1>
            <h3>{movie.release_date}</h3>
            <p>{movie.overview}</p>
          </div>
        </MovieInfo>
      </MovieWrapper>
    );
  }
}

export default MoviesDetail;

const MovieWrapper = styled.div`
  position: relative;
  padding-top: 50vh;
  background: url(${props => props.backdrop}) no-repeat;
  background-size: cover;

  @media (max-width: 900px) {
    padding-top: 0;
  }
`;

const MovieInfo = styled.div`
  background: #eee;
  text-align: left;
  padding: 2rem 10%;
  display: flex;
  > div {
    margin-left: 40px;
    @media (max-width: 700px) {
      margin-left: 0;
      text-align: center;
    }
  }
  img {
    position: relative;
    top: -5rem;

    @media (max-width: 900px) {
      top: 0;
    }
  }

  @media (max-width: 900px) {
    align-items: center;
  }

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;
