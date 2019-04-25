// Action creator
import {
  FETCH_BEERS,
  BEER_SELECTED,
  DELETE_SELECTED_BEERS,
  TOGGLE_SELECT_BEERS, 
} from '../constants';

import beerApi from "../api/beerApi";

export const getBeerList = (page = 1, count = 25) => async dispatch => {
  const response = await beerApi.get(`/`, {
    params: {
      page,
      count
    }
  });
  const { data } = response;

  dispatch({ 
    type: FETCH_BEERS,
    payload: {
      beers: data,
      page
    }
  })
};

export const getSelectedBeer = (id) => async dispatch => {
  const response = await beerApi.get(`/${ id }`);

  dispatch({
    type: BEER_SELECTED,
    payload: response.data
  })
};

export const deleteBeers = (beerIds = []) => {
  return {
    type: DELETE_SELECTED_BEERS,
    payload: beerIds
  }
};

export const toggleSelectBeer = (id) => {
  return {
    type: TOGGLE_SELECT_BEERS,
    payload: id
  };
};
