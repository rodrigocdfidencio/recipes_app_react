import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

const LOCAL_STORAGE_KEY = 'inProgressRecipes';

function Provider({ children }) {
  const [startedRecipes, setStartedRecipes] = useState({ meals: [], cocktails: [] });

  const localState = localStorage.getItem(LOCAL_STORAGE_KEY);

  useEffect(() => {
    if (localState) {
      setStartedRecipes(JSON.parse(localState));
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(startedRecipes));
    }
  }, []);

  const hasCocktails = startedRecipes.cocktails ? (
    startedRecipes.cocktails.length > 0
  ) : true;

  const hasMeals = startedRecipes.meals ? (
    startedRecipes.meals.length > 0
  ) : true;

  if ((hasCocktails || hasMeals) && localState) {
    localStorage
      .setItem(LOCAL_STORAGE_KEY, JSON.stringify(startedRecipes));
  }

  const contextValue = { startedRecipes, setStartedRecipes };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
