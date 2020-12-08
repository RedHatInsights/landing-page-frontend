import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import NotFound from './routes/404';
import { technologiesLoaded } from './store/actions';
import { activeTechnologies } from './consts';
import './App.scss';

const App = ({ loadTechnologies }) => {
  useEffect(() => {
    loadTechnologies(activeTechnologies);
  });

  return <NotFound />;
};

App.propTypes = {
  history: PropTypes.object,
  loadTechnologies: PropTypes.func,
};

App.defaultProps = {
  loadTechnologies: () => undefined,
};

export default connect(null, (dispatch) => ({
  loadTechnologies: (technologies) =>
    dispatch(technologiesLoaded(technologies)),
}))(App);
