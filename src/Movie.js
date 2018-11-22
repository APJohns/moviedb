import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import noposter from './noposter.png';

// This is a funcitonal stateless component

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';

const Movie = ({ movie }) => (
  <Link to={`/${movie.id}`}>
    <Overdrive id={movie.id}>
      {movie.poster_path
        ? <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} title={movie.title} />
        : <Poster src={noposter} alt={movie.title} title={movie.title} />
      }
    </Overdrive>
  </Link>
);

export default Movie;

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export const Poster = styled.img`
  box-shadow: 0 0 35px black;
`;
