import {
  FETCH_BEERS,
  BEER_SELECTED,
  DELETE_SELECTED_BEERS,
  TOGGLE_SELECT_BEERS,
} from '../constants';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_BEERS:
      const { beers, page } = action.payload;

      const newBeerList = (state.displayedList || [])
        .concat(beers)
        .filter((item, index) => {
          return index < 10;
        });

      return Object.assign({}, state, {
        beerList: [
          ...state.beerList || [],
          ...beers
        ],
        page,
        displayedList: newBeerList,
      });

    case BEER_SELECTED:
      return Object.assign({}, state, {
        selectedBeer: action.payload
      });

    case DELETE_SELECTED_BEERS:
      const filteredList = state.beerList.filter(item => action.payload.indexOf( item.id ) === -1);
      const renderList = filteredList.filter((item, index) => {
        return index < 10;
      });

      const beersSelectedList  = state.beerSelectedList;
      const beersSelected = beersSelectedList && beersSelectedList.filter((item) => {
        return !action.payload.includes(item);
      });

      return Object.assign({}, state, {
        beerList: filteredList,
        displayedList: renderList,
        beerSelectedList: beersSelected
      });

    case TOGGLE_SELECT_BEERS:
      const { beerSelectedList } = state;

      if (!beerSelectedList || beerSelectedList.indexOf(action.payload) === -1) {
        return Object.assign({}, state, {
          beerSelectedList: [
            ...state.beerSelectedList || [],
            action.payload
          ]
        });
      } else {
        const filteredSelectedList = beerSelectedList.filter((item) => {
          return item !== action.payload;
        });

        return Object.assign({}, state, {
          beerSelectedList: filteredSelectedList
        });
      }

    default:
      return state;
  }
}
